import "./boots";

import $ from "./native/index";
import Validate from './validate.js';
import htmlParser from './html-parser.js';

// 其他
$.$define('Validate', Validate);
$.$define('htmlParser', htmlParser);
