import 'script-loader!../node_modules/admin-lte/plugins/jQuery/jquery-2.2.3.min'
import 'script-loader!../node_modules/admin-lte/bootstrap/js/bootstrap.min'
import 'script-loader!../node_modules/admin-lte/dist/js/app.min'
import reportList from './report-list'
import Vue from 'vue'
import Clipboard from 'clipboard'

new Clipboard('.copy-btn');

reportList.el = '#app';

new Vue(reportList);