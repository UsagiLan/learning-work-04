import {request} from '../utils/request';
import { stringify } from 'qs';
// const host = "http://10.252.218.173:3001"
const host = "http://127.0.0.1:3001"
//列表页接口
export function getReceiveList(params) {
  return request(`${host}/receive/list?${stringify(params)}`);
}