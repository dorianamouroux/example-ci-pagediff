webhooks as res
    head_sha = res.body.commit_ref
    slug = python -c """
        print("{{res.body.commit_url}}".split('/')[3:4].join('/'))
    """
    status_endpoint = '{{slug}}/commits/{{head_sha}}/statuses'
    pages = ['/', '/events', '/jobs']

    github post status_endpoint {
      'state': 'pending',
      'description': 'Analyzing pages...'
    }

    # create screenshots
    pageres res.body.deploy_ssl_url pages `/new`
    # upload to S3
    s3 cp `/new`, '/{{slug}}/{{head_sha}}/images/' --recursive

    # collect old images
    base = github_find_compare_commit slug, head_sha
    if base
        # download old version
        s3 cp '/{{slug}}/{{base.sha}}/images/', `/old/` --recursive

        # diff each page
        diffs = blink-diff many `/old`, `/new`, `/diff`

        # upload results to S3
        s3 cp `/diff/`, '/{{slug}}/{{head_sha}}/diffs/' --recursive

        # save results to s3
        results = {
            "before": base.sha,
            "after": head_sha,
            "results": diffs
        }
        html_url = s3 cp results '/{{slug}}/{{head_sha}}/results.json'

        new_n = alpine ls `/new`
        diff_n = alpine ls `/diff`

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
      'target_url': '{{url}}/{{slug}}/{{head_sha}}'
    }
