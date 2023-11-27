//ROUTING
const wikiaccount = require('./v1/Account');
const wikipage = require('./v1/Page');
const authjwt = require('./authJWT');
const verifyjwt = require('./middleware/validateJWT');

module.exports = function(app){
    app.get('/AccountLogin/user/:username', wikiaccount.wikiAccountLogin);
//JWT Authentications
   //app.post('/AccounAuthLdap', authjwt.accountAuthLdap);
   app.post('/AccountAuth', authjwt.accountAuth);
   app.post('/RefreshToken', authjwt.refreshToken);
   app.post('/Logout', authjwt.accountLogout);
   
/* Tests */
    app.get('/PageCreate', wikipage.wikiPageCreate);
    app.get('/PageEdit/text/:pagetext', verifyjwt.validateJWT, wikipage.wikiPageEdit);
    app.post('/CreateUser', authjwt.createUser);
    app.get('/CheckAccount', wikiaccount.checkAccount);

}
