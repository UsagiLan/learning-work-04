
import UserController from '../controller/UserController';
import WeeklyController from '../controller/WeeklyController';
export = function (app) {

    app.use(function (req, res, next) {
      console.log('Time:', Date.now())
      next()
    });

    app.get('/', function (req, res, next) {
      // ..
      res.render('index.njk')
    });

    app.get('/user', function (req, res, next) {
      // ..
      res.send({
        code: 0,
        message: "",
        data:{
          list: []
        }
      })
    });

    // 写信
    app.post('/commit', async function (req, res, next) {
      console.log(req.body);
      res.send(await WeeklyController.sendWeekly(req.body));
      
    });

    // 编辑
    app.post('/edit', async function (req, res, next) {
      console.log(req.body);
      res.send(await WeeklyController.editWeekly(req.body));
    });

    // 获取收件箱列表
    app.get('/receive/list', async function (req, res, next) {
      let {username} = req.query;
      console.log(username);
      res.send(await WeeklyController.getReceiveList(username));
    });

    // 
    app.get('/receive/delete', async function (req, res, next) {
      let {id} = req.query;
      res.send(await WeeklyController.deleteWeekly(id));
    });

    app.get('/sent/list', async function (req, res, next) {
      let {username} = req.query;
      console.log(username);
      res.send(await WeeklyController.getSendList(username));
    });

    app.get('/delete/list', async function (req, res, next) {
      let {username} = req.query;
      console.log(username);
      res.send(await WeeklyController.getDeleteList(username));
    });

    app.get('/weeklyInfo', async function (req, res, next) {
      let {id} = req.query;
      console.log(id);
      res.send(await WeeklyController.getWeeklyInfo(id));
    });

    
};