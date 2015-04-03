module.exports = {
  foo: {
    files: [
      {
        expand: true,
        cwd: 'static/images/grunticon-svgs',
        src: ['*.svg', '*.png'],
        dest: 'static/images/grunticon-output'
      }
    ],
    options: {
      customselectors: {
        'left-red' : ['.icon-left:hover', '.icon-left:focus'],
        'facebook-yellow-white': ['.icon-facebook:hover', '.icon-facebook:focus'],
        'gplus-yellow-white': ['.icon-gplus:hover', '.icon-gplus:focus'],
        'twitter-yellow-white': ['.icon-twitter:hover', '.icon-twitter:focus']
      },
      prefix: {
        prefix: '.icon-'
      },
      colors: {
        red: '#CD4D4D',
        yellow: '#fee165'
      },
      defaultWidth: '30px',
      defaultHeight: '30px'
    }
  }
}