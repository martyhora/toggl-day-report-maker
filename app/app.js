import reportList from './report-list'
import Vue from 'vue'
import Clipboard from 'clipboard'

new Clipboard('.copy-btn');

reportList.el = '#app';

new Vue(reportList);