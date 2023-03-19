hexo.on('generateBefore', () => {
  require('./lib/stellar-tag-utils')(hexo);
});

hexo.on('ready', () => {
  const { version } = require('../../package.json');
  hexo.log.info(`
  bbbbbbbb                                                     bbbbbbbb                                              
  b::::::b                                                     b::::::b                                              
  b::::::b                                                     b::::::b                                              
  b::::::b                                                     b::::::b                                              
  b:::::b                                                      b:::::b                                              
  b:::::bbbbbbbbb      aaaaaaaaaaaaa      mmmmmmm    mmmmmmm   b:::::bbbbbbbbb       ooooooooooo      ooooooooooo   
  b::::::::::::::bb    a::::::::::::a   mm:::::::m  m:::::::mm b::::::::::::::bb   oo:::::::::::oo  oo:::::::::::oo 
  b::::::::::::::::b   aaaaaaaaa:::::a m::::::::::mm::::::::::mb::::::::::::::::b o:::::::::::::::oo:::::::::::::::o
  b:::::bbbbb:::::::b           a::::a m::::::::::::::::::::::mb:::::bbbbb:::::::bo:::::ooooo:::::oo:::::ooooo:::::o
  b:::::b    b::::::b    aaaaaaa:::::a m:::::mmm::::::mmm:::::mb:::::b    b::::::bo::::o     o::::oo::::o     o::::o
  b:::::b     b:::::b  aa::::::::::::a m::::m   m::::m   m::::mb:::::b     b:::::bo::::o     o::::oo::::o     o::::o
  b:::::b     b:::::b a::::aaaa::::::a m::::m   m::::m   m::::mb:::::b     b:::::bo::::o     o::::oo::::o     o::::o
  b:::::b     b:::::ba::::a    a:::::a m::::m   m::::m   m::::mb:::::b     b:::::bo::::o     o::::oo::::o     o::::o
  b:::::bbbbbb::::::ba::::a    a:::::a m::::m   m::::m   m::::mb:::::bbbbbb::::::bo:::::ooooo:::::oo:::::ooooo:::::o
  b::::::::::::::::b a:::::aaaa::::::a m::::m   m::::m   m::::mb::::::::::::::::b o:::::::::::::::oo:::::::::::::::o
  b:::::::::::::::b   a::::::::::aa:::am::::m   m::::m   m::::mb:::::::::::::::b   oo:::::::::::oo  oo:::::::::::oo 
  bbbbbbbbbbbbbbbb     aaaaaaaaaa  aaaammmmmm   mmmmmm   mmmmmmbbbbbbbbbbbbbbbb      ooooooooooo      ooooooooooo   
                                                                                                                   
  ===================================================================================================================
    Bamboo ${version}
    Docs: https://hexo-theme-bamboo.netlify.app
    Repo: https://github.com/yuang01/hexo-theme-bamboo
  ===================================================================================================================
`);
});