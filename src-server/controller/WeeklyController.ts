interface WeeklyInfo{
  username: string,
  to: [string],
  copy: [string],
  title: string,
  content: string,
  time?: Date,
  status: number
}
import {getInBox, getOutBox, createWeekly, deleteWeekly} from '../models/index';
import {tryCatchDetect, validateParams} from '../utils/util'
import {CreateItemDto} from '../dto/WeeklyDto'
import { validate } from 'class-validator'

class WeeklyController {

  // 获取用户收件箱列表
  public async getReceiveList(username) {
    return await tryCatchDetect(async function() {
      return await getInBox(username);
      // return [{
      //   username: 'zhangsan',
      //   to: ['lisi','wangwu'],
      //   copy: ['xueqiu'],
      //   title: 'title1',
      //   content: 'content1',
      //   time: Date.now(),
      //   status: 1
      // }];
    })

  }

  // 获取用户发件箱列表
  public async getSendList(name) {
    return await tryCatchDetect(async function() {
      return await getOutBox({name});
    })
  }

  // 获取用户已删除列表
  public async getDeleteList(name) {
    return await tryCatchDetect(async function() {
      return await getOutBox({name, status:0});
    })
  }

  public async deleteWeekly(id) {
    return await tryCatchDetect(async function() {
      return await deleteWeekly(id)
    })
  }

  public async sendWeekly(body: CreateItemDto) {
    return await tryCatchDetect(async function() {
      let errMsg = await validateParams(CreateItemDto, body);
      if (errMsg) {
        throw new Error(errMsg);
      }
      // return {}
      return await createWeekly(body)
    })
  }

}

export default new WeeklyController()