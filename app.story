webhooks as res
    commit = res.body.commit_ref
    slug = python -c "print('{{res.body.commit_url}}'.split('/')[3:4].join('/'))"
    bucket = 's3://{{aws_bucket}}/{{slug}}/{{commit}}'
    status_endpoint = '/repos/{{slug}}/commits/{{commit}}/statuses'

    pages = ['/', '/events', '/jobs']

    github post status_endpoint {
      'state': 'pending',
      'context': 'ci/visual',
      'description': 'Analyzing pages...'
    }

    # screenshot staging site
    pageres res.body.deploy_ssl_url pages `/new`
    s3 cp `/new/`, '{{bucket}}/new/' --recursive

    # screenshot production site
    pageres res.body.url pages `/old`
    s3 cp `/old/`, '{{bucket}}/old/' --recursive

    # diff the screenshots
    diffs = blink-diff many `/old`, `/new`, `/diff`
    s3 cp `/diff/`, '{{bucket}}/diffs/' --recursive
    s3 cp diffs '{{bucket}}/results.json'

    if diffs.failed > 0
        state = 'failure'
        description = '{{diffs.failed}} pages changed.'
    else
        state = 'success'
        description = '{{diffs.passed}} are all same. :tada:'

    github post status_endpoint {
      'state': state,
      'context': 'ci/visual',
      'description': description,
      'target_url': '{{app_url}}/{{slug}}/{{commit}}'
    }
