# netlify webhooks
webhooks post as res
    sha = ...

    # set pending status
    github post '{{env.slug}}/commits/{{sha}}/statuses' {
      'state': 'pending',
      'description': 'Analyzing web pages...'
    }

    # create new screenshots
    # https://github.com/sindresorhus/pageres
    new_shots = pageres res.data.url --save_to='/new'
    # store images in s3
    files = s3cmd put --recursive '/new/' '{{sha}}/images/'

    # get commit to compare against
    base = ...

    # collect all the old images
    s3cmd get --recursive '{{...}}/images/' '/old/'

    # https://github.com/uber-archive/image-diff
    diffs = image-diff '/old' '/new' '/diff'
    # store image diffs in s3
    files = s3cmd put --recursive '/diff/' '{{sha}}/diffs/'

    # build and save html results
    html = handlebars 'results.html'
           --images=images
           --diffs=diffs
    s3cmd put html '{{sha}}/results.html'

    new_n = ls '/new'
    diff_n = ls '/diff'

    if diff_n
        state = 'failure'
        description = '{{diff_n}} file changed of {{new_n}}'
    else
        state = 'success'
        description = '{{new_n}} files remain the same'

    # set github status
    github post '{{env.slug}}/commits/{{sha}}/statuses' {
      'state': state,
      'description': description,
      'target_url': '{{s3_bucket_dsn}}/{{sha}}/results.html'
    }
