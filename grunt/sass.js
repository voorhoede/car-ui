module.exports = {
  foo: {
    files: [
      {
        expand: true,
        cwd: 'assets/scss',
        src: ['main.scss'],
        dest: 'static/css',
        ext: '.css'
      }
    ]
  }
};