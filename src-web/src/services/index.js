import {request} from '../utils/request';
import { stringify } from 'qs';
import { ftoyHost, iyoujiaInterface } from './host';

//列表页接口
export function fetchListData(params) {
  return request(`${ftoyHost}/getLodgeList?${stringify(params)}`);
}