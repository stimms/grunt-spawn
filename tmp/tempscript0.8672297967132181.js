require('../../global.js'); config.silent=true; config.fatal=false; cp("this_file_doesnt_exist", "."); echo("got here");