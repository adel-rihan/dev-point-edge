(function() {
  if (!window.FAE) {
    window.FAE = new Object();
  }

  FAE.raw = 'https://raw.githubusercontent.com/adel759/dev-point-edge/master/';
  FAE.eGIF = 'http://illiweb.com/fa/empty.gif';
  FAE.delay = 1000;
  FAE.cp_lang = {};

  // parse variables in strings for translations
  FAE.parse_vars = function(str, o) {
    var i;

    for (i in o) {
      str = str.replace(new RegExp(i, 'gm'), o[i]);
    }

    return str;
  };

  // log messages to the logger so the user knows what's going on
  FAE.logger = document.getElementById('fae_log');
  FAE.log = function(str, css) {
    FAE.logger.insertAdjacentHTML('beforeend', '<div class="fae_msg_log" ' + (css ? 'style="' + css + '"' : '') + '>' + str + '</div>');
    FAE.logger.scrollTop = 99999;
  };

  // increase size of progress bar
  FAE.bar = document.getElementById('fae_progress');
  FAE.progress = function() {
    var percent = (FAE.index / FAE.quota * 100).toFixed(2);
    FAE.bar.innerHTML = '<div id="fae_prog_bar" style="width:' + percent + '%;"></div><span id="fae_prog_number">' + (percent == 100 ? (FAE.cp_lang.fae_install_complete || 'COMPLETE!') : percent + '%') + '</span>';
  };

  // get update files and combine their steps into one array for consecutive execution
  FAE.getUpdates = function() {
    if (++FAE.update_index >= FAE.update_quota) {
      FAE.log(FAE.cp_lang.fae_update_start || 'Updates are about to begin, please do not close this tab.');

      // get the update utilities and begin the update process
      $.get(FAE.raw + 'updates/utils.js', function(d) {
        FAE.script(d);
        FAE.next();
      });

    } else {
      FAE.log(FAE.cp_lang.fae_update_fetch ? FAE.parse_vars(FAE.cp_lang.fae_update_fetch, {
        '{VERSION_STRING}' : FAE.update_queue[FAE.update_index],
        '{UPDATE_MIN}' : FAE.update_index + 1,
        '{UPDATE_MAX}' : FAE.update_queue.length

      }) : 'Getting update instructions for version ' + FAE.update_queue[FAE.update_index] + '... (' + (FAE.update_index + 1) + '/' + FAE.update_queue.length + ')');

      $.get(FAE.raw + 'updates/' + FAE.update_queue[FAE.update_index] + '.js', function(d) {
        FAE.script(d);

        FAE.log(FAE.cp_lang.fae_update_notes ? FAE.parse_vars(FAE.cp_lang.fae_update_notes, {
          '{RELEASE_TAG}' : FAE.update_tag,
          '{VERSION_STRING}' : FAE.update_queue[FAE.update_index]

        }) : 'Please <a href="' + FAE.update_tag + '" target="_blank">Click here</a> to view the changes made in version ' + FAE.update_queue[FAE.update_index] + '.');

        FAE.step = FAE.step.concat(FAE.update_step);
        FAE.getUpdates();

      }).error(function() {
        FAE.log(FAE.cp_lang.fae_update_error ? FAE.parse_vars(FAE.cp_lang.fae_update_error, {
          '{VERSION_STRING}' : FAE.update_queue[FAE.update_index]

        }) : 'Update instructions for version ' + FAE.update_queue[FAE.update_index] + ' could not be found. Please <a href="http://arab-point.lolbb.com/f77-montada" target="_blank">open a new issue</a> and provide this information for further assistance.', 'color:#E53;font-weight:bold;');

        FAE.getUpdates();
      });
    }
  };

  // create and execute script
  FAE.script = function(content) {
    var script = document.createElement('SCRIPT');
    script.type = 'text/javascript';
    script.text = content;
    document.body.appendChild(script);
  };

  // stuff that needs to be executed when the doc is ready
  $(function() {
    var admin = $('a[href^="/admin/"]').not('.mainmenu')[0], // get the AP link so we can fetch the TID
        installed = document.getElementById('fa_edge');

    // only allow the founder to install the theme
    if (_userdata.user_id == 1 && admin) {
      FAE.tid = admin.href.replace(/.*?(&tid=.*)/, '$1'); // cache the tid
      document.getElementById('fae_actions').style.display = 'block';


      // to prevent errors, make sure that the administration panel is accessible before proceeding.
      // this check is mainly for forums that have the security option "Confirm password to administration access" enabled
      $.get('/admin/index.forum', function(d) {
        if (!$('#change-font-size', d)[0]) {
          FAE.log('Error : You have not logged into your <a href="/admin/index.forum">administration panel</a>. Please log in so that you can use the FAE Control Panel. <a href="https://github.com/adel759/dev-point-edge/wiki/Frequently-Asked-Questions#wiki-wrapper" target="_blank" style="font-weight:normal;"><em>(What is this?)</em></a>', 'color:#E53;font-weight:bold;');
          document.getElementById('fae_options').style.display = 'none';
        }
      });


      // Installation initialization
      document.getElementById('fae_install').onclick = function() {
        if (confirm( (FAE.cp_lang.fae_install_warning ? FAE.parse_vars(FAE.cp_lang.fae_install_warning, {
          '{INSTALL}' : installed ?  FAE.cp_lang.fae_reinstall : FAE.cp_lang.fae_install

        }) : 'Are you sure you want to ' + ( installed ? 're' : '' ) + 'install Dev-Point Edge? This will overwrite your current theme and delete your current JavaScripts. \\\n\\\nPlease make sure to backup all your personal content files such as CSS, Templates, and JavaScripts before proceeding. Click "Cancel" if you\'re not ready to install Dev-Point Edge.').replace(/\\/g, '') )) {

          $.get(FAE.raw + 'javascripts/install.js', function(d) {
            FAE.script(d);
            FAE.next();
          });

          document.getElementById('fae_options').style.display = 'none';
        }
      };

      // extra actions for when the theme is installed.
      if (installed) {
        var uninstall = document.getElementById('fae_uninstall'),
            update = document.getElementById('fae_update');

        document.getElementById('fae_install').value = FAE.cp_lang.reinstall || 'Reinstall';

        $([uninstall, update]).show();

        // Uninstallation initialization
        uninstall.onclick = function() {
          if (confirm( (FAE.cp_lang.fae_uninstall_warning || 'Are you sure you want to uninstall Dev-Point Edge? All CSS, JavaScript, and Template changes will be deleted ; The forum will be reverted to the default phpbb3 theme. \\\n\\\nPlease make sure to backup all your personal content files such as CSS, Templates, and JavaScripts before proceeding. Click "Cancel" if you don\'t want to uninstall Dev-Point Edge yet.').replace(/\\/g, '') )) {

            $.get(FAE.raw + 'javascripts/uninstall.js', function(d) {
              FAE.script(d);
              FAE.next();
            });

            document.getElementById('fae_options').style.display = 'none';
          }
        };


        // Check for updates
        update.onclick = function() {
          FAE.log(FAE.cp_lang.fae_update_check || 'Checking for updates on Github...');
          document.getElementById('fae_options').style.display = 'none';

          $.get(FAE.raw + 'javascripts/version-data.js', function(d) {
            FAE.script(d.replace(/forumactif_edge_version_data/, 'fae_github_version_data'));
            FAE.version_string = d; // save version data for later so we can update the forum version info

            if (forumactif_edge_version_data.length < fae_github_version_data.length) {

              FAE.update_queue = fae_github_version_data.slice(forumactif_edge_version_data.length, fae_github_version_data.length);
              FAE.update_index = -1;
              FAE.update_quota = FAE.update_queue.length;

              FAE.log(FAE.update_queue.length + ' update' + ( i == 1 ? '' : 's' ) + ' found.');
              FAE.log(FAE.cp_lang.fae_update_prepare || 'Preparing to fetch update instructions, please do not close this tab...');

              FAE.step = [];
              FAE.getUpdates();

            } else {
              FAE.log(FAE.cp_lang.fae_update_good || 'Dev-Point Edge is up to date!', 'color:#8B5;font-weight:bold;');
              document.getElementById('fae_options').style.display = 'block';
            }
          });
        };


        // create and insert translation button
        if (!FAE.board_lang) {
          FAE.board_lang = 'English'; // set the board lang to English if it is undefined
        }

        var opts = document.getElementById('fae_options'),
            actdiv = $('<div style="float:left;" />');

        $('#fae_install, #fae_uninstall, #fae_update').appendTo(actdiv);
        $(opts).prepend(actdiv);


        // exclude from other hosts for testing
        if (window.location.host == 'arab-point.gid3an.com') {

          // greate and insert general settings
          $(opts).append('<div class="fae_cp_title clear" style="margin-top:24px;">General Settings</div>'+

            '<p id="fae_theme_desc">This section allows you to manage the general settings of Dev-Point Edge.</p>'+

            '<div class="fae_cp_row">'+
              '<span class="fae_help_me">?'+
                '<span class="fae_help_tip">Drag the slider to adjust the width of the forum.</span>'+
              '</span>'+
              '<span id="fae_label_min" class="fae_label">Forum width : </span>'+
              '<input id="fae_forum_width" type="range" min="30" max="100" value="99" style="vertical-align:middle;" /> <span id="fae_fw_percent">99%</span>'+
            '</div>'+

            '<div class="fae_cp_row">'+
              '<span class="fae_help_me">?'+
                '<span class="fae_help_tip">Position of the navbar links.</span>'+
              '</span>'+
              '<span id="fae_label_min" class="fae_label">Navbar position : </span>'+
              '<label for="fae_nav_dir-left"><input type="radio" id="fae_nav_dir-left" name="fae_nav_dir" checked> Left</label>'+
              '<label for="fae_nav_dir-center"><input type="radio" id="fae_nav_dir-center" name="fae_nav_dir"> Center</label>'+
              '<label for="fae_nav_dir-right"><input type="radio" id="fae_nav_dir-right" name="fae_nav_dir"> Right</label>'+
            '</div>'+

            '<div class="fae_cp_row">'+
              '<span class="fae_help_me">?'+
                '<span class="fae_help_tip">Position of the forum logo.</span>'+
              '</span>'+
              '<span id="fae_label_min" class="fae_label">Logo position : </span>'+
              '<label for="fae_logo_dir-left"><input type="radio" id="fae_logo_dir-left" name="fae_logo_dir" checked> Left</label>'+
              '<label for="fae_logo_dir-center"><input type="radio" id="fae_logo_dir-center" name="fae_logo_dir"> Center</label>'+
              '<label for="fae_logo_dir-right"><input type="radio" id="fae_logo_dir-right" name="fae_logo_dir"> Right</label>'+
            '</div>'+

            '<div class="fae_cp_row">'+
              '<span class="fae_help_me">?'+
                '<span class="fae_help_tip">Position of the post profile in topics.</span>'+
              '</span>'+
              '<span id="fae_label_min" class="fae_label">Profile position : </span>'+
              '<label for="fae_profil_dir-left"><input type="radio" id="fae_profil_dir-left" name="fae_profil_dir" checked> Left</label>'+
              '<label for="fae_profil_dir-right"><input type="radio" id="fae_profil_dir-right" name="fae_profil_dir"> Right</label>'+
            '</div>'+

            '<div class="fae_cp_row">'+
              '<input id="fae_update_general" type="button" value="Save changes" />'+
            '</div>'
          );

          // update the percentage counter
          document.getElementById('fae_forum_width')[/trident/i.test(window.navigator.userAgent) ? 'onchange' : 'oninput'] = function() {
            document.getElementById('fae_fw_percent').innerHTML = this.value + '%';
          };


          // update the general settings
          document.getElementById('fae_update_general').onclick = function() {
            FAE.log('Updating general settings..');

            var width = +document.getElementById('fae_forum_width').value,

                nav_dir = document.getElementById('fae_nav_dir-left').checked ? 'left' :
                          document.getElementById('fae_nav_dir-center').checked ? 'center' :
                          document.getElementById('fae_nav_dir-right').checked ? 'right' : 'left',

                logo_dir = document.getElementById('fae_logo_dir-left').checked ? 'left' :
                           document.getElementById('fae_logo_dir-center').checked ? 'center' :
                           document.getElementById('fae_logo_dir-right').checked ? 'right' : 'left',

                profil_dir = document.getElementById('fae_profil_dir-left').checked ? 'left' :
                             document.getElementById('fae_profil_dir-right').checked ? 'right' : 'left',
                profil_dir2 = profil_dir == 'left' ? 'right' : 'left',

                val,
                form;

            // assign style rules to variables
            width = '/*!FAE_WIDTH*/#page-body{width:' + width + '%;margin:0 auto;' + ( width >= 100 ? 'padding:0;' : '' ) + '}';
            nav_dir = '/*!FAE_NAV_DIR*/#navbar{text-align:' + nav_dir + '}';
            logo_dir = '/*!FAE_LOGO_DIR*/#logo-desc{text-align:' + logo_dir + '}#logo{float:' + ( logo_dir == 'center' ? 'none' : logo_dir ) + '}';
            profil_dir = '/*!FAE_PROFIL_DIR*/.postprofile{float:' + profil_dir + ';margin-' + profil_dir + ':-300px;margin-' + profil_dir2 + ':0px}.post-inner{margin-' + profil_dir2 + ':0;margin-' + profil_dir + ':300px}';

            // get the stylesheet
            $.get('/admin/index.forum?mode=colors&part=themes&sub=logos&tid=' + FAE.tid, function(d) {
              form = $('form[method="post"]', d)[0];

              if (form) {
                val = form.edit_code.value;

                // update stylesheet with new FORUM WIDTH rule
                if (/\/\*!FAE_WIDTH\*\/#page-body\{.*?\}/.test(form.edit_code.value)) {
                  val = val.replace(/\/\*!FAE_WIDTH\*\/#page-body\{.*?\}/, width);
                } else {
                  val += '\n' + width;
                }

                // update stylesheet with new NAVBAR POSITION rule
                if (/\/\*!FAE_NAV_DIR\*\/#navbar\{text-align:.*?\}/.test(form.edit_code.value)) {
                  val = val.replace(/\/\*!FAE_NAV_DIR\*\/#navbar\{text-align:.*?\}/, nav_dir);
                } else {
                  val += '\n' + nav_dir;
                }

                // update stylesheet with new LOGO POSITION rule
                if (/\/\*!FAE_LOGO_DIR\*\/#logo-desc\{text-align:.*?\}#logo\{float:.*?\}/.test(form.edit_code.value)) {
                  val = val.replace(/\/\*!FAE_LOGO_DIR\*\/#logo-desc\{text-align:.*?\}#logo\{float:.*?\}/, logo_dir);
                } else {
                  val += '\n' + logo_dir;
                }


                // update stylesheet with new PROFILE POSITION rule
                if (/\/\*!FAE_PROFIL_DIR\*\/\.postprofile\{float:.*?;.*?\}\.post-inner\{.*?\}/.test(form.edit_code.value)) {
                  val = val.replace(/\/\*!FAE_PROFIL_DIR\*\/\.postprofile\{float:.*?;.*?\}\.post-inner\{.*?\}/, profil_dir);
                } else {
                  val += '\n' + profil_dir;
                }

                // update the stylesheet
                $.post('/admin/index.forum?part=themes&sub=logos&mode=css&extended_admin=1&tid=' + FAE.tid, {
                  edit_code : val,
                  submit : 'Save'

                }, function(d) {
                  FAE.log('General settings have been updated successfully !', 'font-weight:bold;color:#8B5;');
                  FAE.log('Please <a href="javascript:window.location.reload();">click here</a> to reload the page.');
                });

              }
            });

            document.getElementById('fae_options').style.display = 'none';
          };

        }
      }

    } else {
      FAE.log(FAE.cp_lang.fae_err_not_founder || 'Only <a href="/u1">the founder</a> may use this control panel. Please contact them for assistance in installing Dev-Point Edge.', 'color:#E53;font-weight:bold;');
    }
  });

  // help link
  $('#fae_cp').append('<div style="margin-top:12px"><a href="https://github.com/adel759/dev-point-edge/wiki/FAE-Control-Panel-Guide" target="_blank" style="float:right;"><strong>Help!</strong></a><div class="clear"></div></div>');

  // extra cp stylesheet
  $('head').append(
    '<style type="text/css">'+
      '.fae_cp_row { margin:6px 0; }'+
      '.fae_label { display:inline-block; width:200px; }'+
      '.fae_help_me { color:#FFF; font-size:18px; background:#69C; border-radius:100%; text-align:center; vertical-align:middle; display:inline-block; height:24px; line-height:24px; width:24px; margin:auto 3px; position:relative; cursor:help; }'+
      '.fae_help_tip { color:#333; font-size:12px; line-height:15px; background:#EEE; border:1px solid #CCC; border-radius:3px; display:inline-block; width:300px; padding:3px; position:absolute; visibility:hidden; z-index:1; }'+
      '#fae_cp label { margin-right:10px; display:inline-block; }'+
      '#fae_cp label input { vertical-align:text-bottom; }'+
      '.fae_help_me:hover .fae_help_tip { visibility:visible; }'+
      'body #fae_cp { color:#333; background:#F6F6F6; border:1px solid #CCC; margin:50px 25px; padding:12px; }'+
      '#fae_cp select, #fae_cp input { color:#333; background:#FFF; }'+
      '#fae_selected_color option:not([value="Default"]) { color:#FFF; }'+
    '</style>'
  );
}());