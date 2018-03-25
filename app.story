webhooks as res
    commit = res.body.commit_ref
    slug = python -c "print('{{res.body.commit_url}}'.split('/')[3:4].join('/'))"

    pages = ['/', '/events', '/jobs']

    github post '{{slug}}/commits/{{commit}}/statuses' {
      'state': 'pending',
      'context': 'visual-testing',
      'description': 'Analyzing pages...'
    }

    # screenshot staging site
    pageres res.body.deploy_ssl_url pages `/new`
    s3 cp `/new/`, '/{{slug}}/{{commit}}/new/' --recursive

    # screenshot production site
    pageres res.body.url pages `/old`
    s3 cp `/old/`, '/{{slug}}/{{commit}}/old/' --recursive

    # diff all thepages
    diffs = blink-diff many `/old`, `/new`, `/diff`
    s3 cp `/diff/`, '/{{slug}}/{{commit}}/diffs/' --recursive
    s3 cp diffs '/{{slug}}/{{commit}}/results.json'

    if diffs.failed > 0
        state = 'failure'
        description = '{{diffs.failed}} pages changed.'
    else
        state = 'success'
        description = '{{diffs.passed}} are all same. :tada:'

    github post '{{slug}}/commits/{{commit}}/statuses' {
      'state': state,
      'context': 'visual-testing',
      'description': description,
      'target_url': '{{url}}/{{slug}}/{{commit}}'
    }
