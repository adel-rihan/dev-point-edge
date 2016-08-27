// installation instructions
FAE.step = [

  {
    info : 'Changing forum version to phpbb2',
    type : 'POST',
     url : 'part=themes&sub=styles&mode=version&extended_admin=1',
    data : {
                 tpl : 'subsilver',
          keep_theme : 2,
                code : 1,
      change_version : 'Save'
    }
  },


  {
    info : 'Unoptimizing and deactivating default CSS',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=css&extended_admin=1',
    data : {
      allow_css_perso : 0,
             css_base : 0,
         optimize_css : 0,
      submit_base_css : 'Save'
    }
  },


  {
    info : 'Getting style_sheet.css',
    type : 'GET',
     url : FAE.raw + 'css/style_sheet.css',
    func : function(d) {
      FAE.step[FAE.index + 1].data.edit_code = d;
    }
  },


  {
    info : 'Installing style_sheet.css',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=css&extended_admin=1',
    data : {
         submit : 'Submit'
    }
},


  {
    info : 'Getting and deleting all JavaScript files to prevent installation errors',
    type : 'GET',
     url : '/admin/index.forum?mode=js&part=modules&sub=html&tid=' + FAE.tid,
    func : function(d) {
      var form = $('#pageListHtml', d),
          file = $('input[type="checkbox"]', form),
          i = 0,
          j = file.length;

      if (form[0]) {
        for (; i < j; i++) {
          file[i].checked = true;
        }

        $.post(form[0].action, form.serialize() + '&attachments_submit=Delete', function(d) {
          var confirmation = $('form[method="post"]', d);
          $.post(confirmation[0].action, confirmation.serialize() + '&confirm=Yes');
        });
      }
    }
  },


  {
    info : 'Enabling JavaScript codes management',
    type : 'POST',
     url : 'part=modules&sub=html&mode=js_delete&extended_admin=1',
    data : {
      allow_js_module : 1,
          conf_submit : 'Save'
    }
  },


  {
    info : 'Getting all.js',
    type : 'GET',
     url : FAE.raw + 'javascripts/in-all-the-pages/all.js',
    func : function(d) {
      FAE.step[FAE.index + 1].data.content = d;
    }
  },


  {
    info : 'Installing all.js',
    type : 'POST',
     url : 'part=modules&sub=html&mode=js_edit&extended_admin=1',
    data : {
                 title : '[DP EDGE] ALL.JS',
      'js_placement[]' : 'allpages',
                  mode : 'save',
                submit : 'Submit'
    }
  },


  {
    info : 'Getting version-data.js',
    type : 'GET',
     url : FAE.raw + 'javascripts/version-data.js',
    func : function(d) {
      FAE.step[FAE.index + 1].data.content = d;
    }
  },


  {
    info : 'Installing version-data.js',
    type : 'POST',
     url : 'part=modules&sub=html&mode=js_edit&extended_admin=1',
    data : {
                 title : '[DP EDGE] VERSION-DATA.JS',
      'js_placement[]' : 'allpages',
                  mode : 'save',
                submit : 'Submit'
    }
  },


  {
    info : 'Getting template agreement.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/agreement.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template agreement.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 101,
             l : 'main',
      tpl_name : 'agreement',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template agreement.html',
    type : 'PUBLISH',
     tpl : 101
  },


  {
    info : 'Getting template index_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/index_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template index_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 110,
             l : 'main',
      tpl_name : 'index_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template index_body.html',
    type : 'PUBLISH',
     tpl : 110
  },


  {
    info : 'Getting template index_box.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/index_box.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template index_box.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 111,
             l : 'main',
      tpl_name : 'index_box',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template index_box.html',
    type : 'PUBLISH',
     tpl : 111
  },


  {
    info : 'Getting template overall_footer_begin.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/overall_footer_begin.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template overall_footer_begin.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 115,
             l : 'main',
      tpl_name : 'overall_footer_begin',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template overall_footer_begin.html',
    type : 'PUBLISH',
     tpl : 115
  },


  {
    info : 'Getting template overall_footer_end.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/overall_footer_end.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template overall_footer_end.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 133,
             l : 'main',
      tpl_name : 'overall_footer_end',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template overall_footer_end.html',
    type : 'PUBLISH',
     tpl : 133
  },


  {
    info : 'Getting template overall_header.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/overall_header.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template overall_header.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 116,
             l : 'main',
      tpl_name : 'overall_header',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template overall_header.html',
    type : 'PUBLISH',
     tpl : 116
  },


  {
    info : 'Getting template topics_list_box.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/topics_list_box.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template topics_list_box.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 124,
             l : 'main',
      tpl_name : 'topics_list_box',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template topics_list_box.html',
    type : 'PUBLISH',
     tpl : 124
  },


  {
    info : 'Getting template viewforum_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/viewforum_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template viewforum_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 125,
             l : 'main',
      tpl_name : 'viewforum_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template viewforum_body.html',
    type : 'PUBLISH',
     tpl : 125
  },


  {
    info : 'Getting template viewtopic_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/viewtopic_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template viewtopic_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 127,
             l : 'main',
      tpl_name : 'viewtopic_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template viewtopic_body.html',
    type : 'PUBLISH',
     tpl : 127
  },


  {
    info : 'Getting template viewtopic_poll_ballot.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/viewtopic_poll_ballot.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template viewtopic_poll_ballot.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 128,
             l : 'main',
      tpl_name : 'viewtopic_poll_ballot',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template viewtopic_poll_ballot.html',
    type : 'PUBLISH',
     tpl : 128
  },


  {
    info : 'Getting template viewtopic_poll_result.html',
    type : 'GET',
     url : FAE.raw + 'templates/general/viewtopic_poll_result.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template viewtopic_poll_result.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 129,
             l : 'main',
      tpl_name : 'viewtopic_poll_result',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template viewtopic_poll_result.html',
    type : 'PUBLISH',
     tpl : 129
  },


  {
    info : 'Getting template mod_news.html',
    type : 'GET',
     url : FAE.raw + 'templates/portal/mod_news.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template mod_news.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 902,
             l : 'main',
      tpl_name : 'mod_news',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template mod_news.html',
    type : 'PUBLISH',
     tpl : 902
  },


  {
    info : 'Getting template mod_recent_topics.html',
    type : 'GET',
     url : FAE.raw + 'templates/portal/mod_recent_topics.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template mod_recent_topics.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 904,
             l : 'main',
      tpl_name : 'mod_recent_topics',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template mod_recent_topics.html',
    type : 'PUBLISH',
     tpl : 904
  },


  {
    info : 'Getting template posting_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/post-and-private-messages/posting_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template posting_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 501,
             l : 'main',
      tpl_name : 'posting_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template posting_body.html',
    type : 'PUBLISH',
     tpl : 501
  },


  {
    info : 'Getting template posting_poll_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/post-and-private-messages/posting_poll_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template posting_poll_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 504,
             l : 'main',
      tpl_name : 'posting_poll_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template posting_poll_body.html',
    type : 'PUBLISH',
     tpl : 504
  },


  {
    info : 'Getting template privmsgs_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/post-and-private-messages/privmsgs_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template privmsgs_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 511,
             l : 'main',
      tpl_name : 'privmsgs_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template privmsgs_body.html',
    type : 'PUBLISH',
     tpl : 511
  },


  {
    info : 'Getting template privmsgs_popup.html',
    type : 'GET',
     url : FAE.raw + 'templates/post-and-private-messages/privmsgs_popup.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template privmsgs_popup.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 512,
             l : 'main',
      tpl_name : 'privmsgs_popup',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template privmsgs_popup.html',
    type : 'PUBLISH',
     tpl : 512
  },


  {
    info : 'Getting template privmsgs_read_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/post-and-private-messages/privmsgs_read_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template privmsgs_read_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 514,
             l : 'main',
      tpl_name : 'privmsgs_read_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template privmsgs_read_body.html',
    type : 'PUBLISH',
     tpl : 514
  },


  {
    info : 'Getting template profile_add_body.html',
    type : 'GET',
     url : FAE.raw + 'templates/profile/profile_add_body.html',
    func : function(d) {
      FAE.step[FAE.index + 1].data.template = d;
    }
  },


  {
    info : 'Installing template profile_add_body.html',
    type : 'POST',
     url : 'part=themes&sub=templates&mode=edit_main&extended_admin=1',
    data : {
             t : 701,
             l : 'main',
      tpl_name : 'profile_add_body',
        submit : 'Save'
    }
  },


  {
    info : 'Publishing template profile_add_body.html',
    type : 'PUBLISH',
     tpl : 701
  },


  {
     info : 'Enabling custom templates',
     type : 'POST',
      url : 'mode=main&part=themes&sub=templates',
     data : {
       switchTemplates : 2,
                submit : 'Save'
     }
  },


  {
    info : 'Installing images for "General / explore"',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=depart&page=general&mode=general&extended_admin=1',
    data : {
      i_logo : FAE.eGIF,
      i_background : FAE.eGIF,
      i_back_title : 'http://a7la.pe.hu/dev1/images/cat_head.png',
      i_back_catg : 'http://a7la.pe.hu/dev1/images/cat_head.png',
      i_back_catd : 'http://a7la.pe.hu/dev1/images/cat_head.png',
      i_vote_lcap : 'http://hitsk.in/t/14/78/03/i_vote_lcap.gif',
      i_voting_bar : 'http://illiweb.com/fa/invision/bar.gif',
      i_vote_rcap : 'http://illiweb.com/fa/invision/bar_right.gif',
      i_icon_mini_index : FAE.eGIF,
      i_icon_mini_calendar : FAE.eGIF,
      i_icon_mini_gallery : FAE.eGIF,
      i_icon_mini_portal : FAE.eGIF,
      i_icon_mini_faq : FAE.eGIF,
      i_icon_mini_search : FAE.eGIF,
      i_icon_mini_members : FAE.eGIF,
      i_icon_mini_groups : FAE.eGIF,
      i_icon_mini_profile : FAE.eGIF,
      i_icon_mini_message : FAE.eGIF,
      i_icon_mini_new_message : FAE.eGIF,
      i_icon_mini_register : FAE.eGIF,
      i_icon_mini_login : FAE.eGIF,
      i_icon_mini_logout : FAE.eGIF,
      i_whosonline : FAE.eGIF,
      i_corners_left : FAE.eGIF,
      i_corners_right : FAE.eGIF,
      i_corners2_left : FAE.eGIF,
      i_corners2_right : FAE.eGIF,
      i_header_bg : FAE.eGIF,
      i_list_bg : FAE.eGIF,
      page : 'general',
      submit : 'Save'
    }
  },


  {
    info : 'Installing images for "Icons for the forum"',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=depart&page=forum&mode=forum&extended_admin=1',
    data : {
      i_category : 'http://a7la.pe.hu/dev1/images/forum_old.gif',
      i_category_new : 'http://a7la.pe.hu/dev1/images/forum_new.gif',
      i_category_locked : 'http://a7la.pe.hu/dev1/images/forum_lock.gif',
      i_folder_big : 'http://a7la.pe.hu/dev1/images/forum_old.gif',
      i_folder_new_big : 'http://a7la.pe.hu/dev1/images/forum_new.gif',
      i_folder_locked_big : 'http://a7la.pe.hu/dev1/images/forum_lock.gif',
      page : 'forum',
      submit : 'Save'
    }
  },


  {
    info : 'Installing images for "Icons for topics"',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=depart&page=topics&mode=topics&extended_admin=1',
    data : {
      i_folder : 'http://a7la.pe.hu/dev1/images/thread.gif',
      i_folder_new : 'http://a7la.pe.hu/dev1/images/thread_new.gif',
      i_folder_new_hot : 'http://a7la.pe.hu/dev1/images/thread_hot_new.gif',
      i_folder_lock : 'http://a7la.pe.hu/dev1/images/thread_lock.gif',
      i_folder_lock_new : 'http://a7la.pe.hu/dev1/images/thread_lock.gif',
      i_folder_hot : 'http://a7la.pe.hu/dev1/images/thread_hot.gif',
      i_folder_announce : 'http://a7la.pe.hu/dev1/images/announcement_old.gif',
      i_folder_announce_new : 'http://a7la.pe.hu/dev1/images/announcement_new.gif',
      i_folder_global_announce : 'http://a7la.pe.hu/dev1/images/announcement_old.gif',
      i_folder_global_announce_new : 'http://a7la.pe.hu/dev1/images/announcement_new.gif',
      i_folder_sticky : 'http://a7la.pe.hu/dev1/images/pin.png',
      i_folder_sticky_new : 'http://a7la.pe.hu/dev1/images/pin.png',
      i_topic_delete : FAE.eGIF,
      i_topic_lock : FAE.eGIF,
      i_topic_merge : FAE.eGIF,
      i_topic_move : FAE.eGIF,
      i_topic_split : FAE.eGIF,
      i_topic_trashcan : FAE.eGIF,
      i_topic_unlock : FAE.eGIF,
      page : 'topics',
      submit : 'Save'
    }
  },


  {
    info : 'Installing images for "Mini-icons"',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=depart&page=icons&mode=icons&extended_admin=1',
    data : {
      i_icon_minicat : 'http://a7la.pe.hu/dev1/images/subforum_old.gif',
      i_icon_minicat_new : 'http://a7la.pe.hu/dev1/images/subforum_new.gif',
      i_icon_minicat_locked : 'http://a7la.pe.hu/dev1/images/subforum_old.gif',
      i_icon_minitime : 'http://a7la.pe.hu/dev1/images/clock.gif',
      i_icon_minipost : 'http://a7la.pe.hu/dev1/images/subforum_old.gif',
      i_icon_minipost_new : 'http://a7la.pe.hu/dev1/images/subforum_new.gif',
      i_icon_minipost_lock : 'http://a7la.pe.hu/dev1/images/subforum_old.gif',
      i_icon_minipost_participate : 'http://a7la.pe.hu/dev1/images/thread_dot.gif',
      i_icon_latest_reply : 'http://a7la.pe.hu/dev1/images/clock.gif',
      i_icon_newest_reply : 'http://a7la.pe.hu/dev1/images/clock.gif',
      i_icon_calendar : FAE.eGIF,
      i_icon_tiny_topic : FAE.eGIF,
      i_icon_tiny_profile : FAE.eGIF,
      i_icon_gender_male : FAE.eGIF,
      i_icon_gender_female : FAE.eGIF,
      i_up_arrow : 'http://i86.servimg.com/u/f86/18/21/41/30/up-f10.png',
      i_down_arrow : 'http://i86.servimg.com/u/f86/18/21/41/30/down-f10.png',
      i_left_arrow : 'http://i86.servimg.com/u/f86/18/21/41/30/prev-f10.png',
      i_right_arrow : 'http://i86.servimg.com/u/f86/18/21/41/30/next-f10.png',
      i_tabs_less : 'http://i86.servimg.com/u/f86/18/21/41/30/minus-11.png',
      i_tabs_more : 'http://i86.servimg.com/u/f86/18/21/41/30/plus-f11.png',
      i_icon_mini_online : 'http://i86.servimg.com/u/f86/18/21/41/30/online10.png',
      i_icon_mini_offline : 'http://i86.servimg.com/u/f86/18/21/41/30/offlin10.png',
      page : 'icons',
      submit : 'Save'
    }
  },


  {
    info : 'Installing images for "Buttons"',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=depart&page=buttons&mode=buttons&extended_admin=1',
    data : {
      i_post : 'http://a7la.pe.hu/dev1/images/new_topic.png',
      i_reply : 'http://a7la.pe.hu/dev1/images/new_reply.png',
      i_reply_locked : 'http://a7la.pe.hu/dev1/images/lock.png',
      i_icon_quote : 'http://a7la.pe.hu/dev1/images/quote.png',
      i_icon_multiquote_off : FAE.eGIF,
      i_icon_multiquote_on : FAE.eGIF,
      i_icon_thanks_off : FAE.eGIF,
      i_icon_thanks_on : FAE.eGIF,
      i_icon_edit : 'http://a7la.pe.hu/dev1/images/edit.png',
      i_icon_delete : FAE.eGIF,
      i_icon_ip : 'http://a7la.pe.hu/dev1/images/ip.png',
      i_icon_report : 'http://a7la.pe.hu/dev1/images/report.png',
      i_icon_report_new : FAE.eGIF,
      i_icon_report_locked : FAE.eGIF,
      i_icon_lock_report : FAE.eGIF,
      i_icon_unlock_report : FAE.eGIF,
      i_icon_search : FAE.eGIF,
      i_icon_profile : 'http://i74.servimg.com/u/f74/18/53/83/70/user_s10.png',
      i_icon_www : 'http://i74.servimg.com/u/f74/18/53/83/70/world10.png',
      i_icon_email : 'http://i55.servimg.com/u/f55/11/60/84/00/modera10.gif',
      i_icon_pm : 'http://i74.servimg.com/u/f74/18/53/83/70/multip10.gif',
      i_icon_fb : 'http://i57.servimg.com/u/f57/18/53/83/70/facebo10.png',
      i_icon_twitter : 'http://a7la.pe.hu/dev1/info/twitter.png',
      i_icon_pinterest : FAE.eGIF,
      i_icon_aim : FAE.eGIF,
      i_icon_icq_add : FAE.eGIF,
      i_icon_msnm : FAE.eGIF,
      i_icon_yim : FAE.eGIF,
      i_icon_skype : FAE.eGIF,
      i_icon_online : 'http://a7la.pe.hu/dev1/images/online.gif',
      i_msg_newpost : 'http://a7la.pe.hu/dev1/images/new_pm.png',
      i_msg_inbox : 'http://hitsk.in/t/17/34/39/i_msg_inbox.png',
      i_msg_sentbox : 'http://hitsk.in/t/17/34/39/i_msg_sentbox.png',
      i_msg_outbox : 'http://hitsk.in/t/17/34/39/i_msg_outbox.png',
      i_msg_savebox : 'http://hitsk.in/t/17/34/39/i_msg_savebox.png',
      i_icon_ajax_edit : 'http://i86.servimg.com/u/f86/18/21/41/30/edit-f10.png',
      i_icon_ajax_valid : 'http://i86.servimg.com/u/f86/18/21/41/30/valid-10.png',
      i_icon_attachment_see : 'http://i86.servimg.com/u/f86/18/21/41/30/show-a10.png',
      i_icon_attachment_download : 'http://i86.servimg.com/u/f86/18/21/41/30/downlo10.png',
      page : 'buttons',
      submit : 'Save'
    }
  },


  {
    info : 'Installing images for "Gallery"',
    type : 'POST',
     url : 'part=themes&sub=logos&mode=depart&page=&mode=gallery&extended_admin=1',
    data : {
      upload_pic : 'http://iconshow.me/media/images/ui/ios7-icons/png/48/upload_1.png',
      link_public_galleries : 'http://i86.servimg.com/u/f86/18/21/41/30/public10.png',
      link_personal_galleries : 'http://i86.servimg.com/u/f86/18/21/41/30/person10.png',
      link_personal_gallery : 'http://i86.servimg.com/u/f86/18/21/41/30/user-g10.png',
      backup_folder : 'http://i86.servimg.com/u/f86/18/21/41/30/backup10.png',
      icon_moderate : 'http://i86.servimg.com/u/f86/18/21/41/30/modera10.png',
      icon_stats : 'http://i86.servimg.com/u/f86/18/21/41/30/statis10.png',
      icon_left_arrow3 : 'http://i86.servimg.com/u/f86/18/21/41/30/prev-f10.png',
      icon_right_arrow3 : 'http://i86.servimg.com/u/f86/18/21/41/30/next-f10.png',
      rating_star : 'http://i86.servimg.com/u/f86/18/21/41/30/star-f10.png',
      rating_star_empty : 'http://i86.servimg.com/u/f86/18/21/41/30/star-e10.png',
      icon_first_arrow : 'http://i86.servimg.com/u/f86/18/21/41/30/first-10.png',
      icon_last_arrow : 'http://i86.servimg.com/u/f86/18/21/41/30/last-f10.png',
      submit : 'Save'
    }
  },


  {
    info : 'Updating Structure and Hierarchy',
    type : 'POST',
     url : 'part=themes&sub=index&mode=1&extended_admin=1',
    data : {
      splited_categories : 4,
      last_topic_title : 1,
      last_topic_avatar : 1,
      last_topic_title_length : 16,
      sub_level_links : 2,
      moderators_links : 1,
      display_viewonline : 1,
      display_viewonline_bots : 1,
      menu_id : 0,
      mod_id : 1,
      sub_id : 1,
      submit : 'Save'
    }
  },


  {
    info : 'Updating Headers and Navigation',
    type : 'POST',
     url : 'part=themes&sub=index&mode=navbar&extended_admin=1',
    data : {
      logo_position : 1,
      show_sitename : 0,
      show_icon_only : 1,
      menu_position : 1,
      navbar_one_line : 1,
      mode : 'header',
      submit : 'Save'
    }
  },


  {
    info : 'Updating Toolbar Configuration',
    type : 'POST',
     url : 'part=modules&sub=toolbar',
    data : {
      activate_toolbar : 1,
      fix_toolbar : 0,
      submit : 'Save'
    }
  },


  {
    info : 'Resynchronizing forum',
    type : 'POST',
     url : 'mode=general&part=general&sub=general',
    data : {
      resync : 'on',
      submit : 'Save'
    }
  }
];

FAE.index = -1;
FAE.quota = FAE.step.length;

// proceed to and execute the next step in the installation
FAE.next = function() {
  if (++FAE.index >= FAE.quota) {
    FAE.log('Installation of Dev-Point Edge has been completed successfully!', 'color:#8B5;font-weight:bold;');
    FAE.log('When you\'re finished, please <a href="javascript:window.location.reload();">click here</a> to reload the page and experience your forum in a whole new way!');

  } else {
    var step = FAE.step[FAE.index];
    FAE.log(step.info + '...');

    if (step.type == 'POST') {
      $.post('/admin/index.forum?' + step.url + FAE.tid, step.data, function() {
        window.setTimeout(FAE.next, FAE.delay);
      }).error(FAE.error);

    } else if (step.type == 'GET') {
      $.get(step.url, function(d) {
        step.func(d);
        window.setTimeout(FAE.next, FAE.delay);
      }).error(FAE.error);

    } else if (step.type == 'PUBLISH') {
      $.get('/admin/index.forum?part=themes&sub=templates&mode=edit_main&main_mode=edit&extended_admin=1&t=' + step.tpl + '&l=' + ( step.mobile ? 'mobile' : 'main' ) + '&pub=1&tid=' + FAE.tid, function() {
        window.setTimeout(FAE.next, FAE.delay);
      }).error(FAE.error);
    }

  }

  FAE.progress();
};

// handler in case of any errors in the installation process
FAE.error = function() {
  FAE.log('An error was encountered on step ' + FAE.index + ' (' + FAE.step[FAE.index].info + ') of the installation process. Please <a href="http://arab-point.lolbb.com/f77-montada" target="_blank">open a new issue</a> and provide this information for further assistance.', 'color:#E53;font-weight:bold;');
  window.setTimeout(FAE.next, 1000);
};