commands.addUserCommand(
    ['openwith'],
    'Open current url with external commands',
    function(args){
      var URL = buffer.URL;
      var Cc = Components.classes;
      var Ci = Components.interfaces;
      var file = Cc["@mozilla.org/file/local;1"]
        .createInstance(Ci.nsILocalFile);
      var environment = Cc["@mozilla.org/process/environment;1"]
        .getService(Ci.nsIEnvironment);
      var path = environment.get("PATH").split(':');
      for (var i=0; i < path.length; ++i) {
        file.initWithPath(path[i]+'/'+args[0]);
        if (file.exists())
          break;
      }
      liberator.echo('Opening with '+args.shift());
      args = args.concat([URL]);
      var process = Cc["@mozilla.org/process/util;1"]
        .createInstance(Ci.nsIProcess);
      process.init(file);
      process.run(false, args, args.length);
    },
    {
      completer: function (context) completion.shellCommand(context)
    },
    true
    );
