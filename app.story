webhooks post as res
    head_sha = res.body.commit_ref
    slug = python -c """
        print("{{res.body.commit_url}}".split('/')[3:4].join('/'))
    """

    status_endpoint = '{{slug}}/commits/{{head_sha}}/statuses'

    github post status_endpoint {
      'state': 'pending',
      'description': 'Analyzing pages...'
    }

    # create screenshots of new pages
    pages = ['/', '/events', '/jobs']
    pageres res.body.deploy_ssl_url pages --save_to='/new'
    new_images = s3 cp --recursive '/new/', '{{slug}}/{{head_sha}}/images/'

    # collect old images
    base = github_find_compare_commit slug, head_sha
    if base
        old_images = s3 cp --recursive '{{slug}}/{{base.sha}}/images/', '/old/'

        # https://github.com/uber-archive/image-diff
        image-diff '/old', '/new', '/diff'
        diff_images = s3 cp --recursive '/diff/', '{{slug}}/{{head_sha}}/diffs/'

        # build and save html results
        html = handlebars 'results.html'
               --old_images=old_images
               --new_images=new_images
               --diff_images=diff_images
        html_url = s3 cp html '{{slug}}/{{head_sha}}/results.html'

        new_n = ls '/new'
        diff_n = ls '/diff'

        if diff_n
            state = 'failure'
            description = '{{diff_n}} file changed of {{new_n}}'
        else
            state = 'success'
            description = '{{new_n}} files remain the same'
    else
        state = 'success'
        description = 'Nothing to compare against.'

    # set github status
    github post status_endpoint {
      'state': state,
      'description': description,
      'target_url': html_url
    }
