const WikiApi = require('wikiapi')
require('dotenv').config();
const apiUrl = process.env.WIKI_API;
exports.wikiPageEdit = (req, res) => {
//	username = req.params.user;
  //      password = req.params.pass;
	pagetext = req.params.pagetext;
	username = req.decodedToken.username; //Decoded From MiddleWare
	/*(async () => {
		try {
		const wiki = new WikiApi(apiUrl)
			await wiki.login('username', 'password'); //Wiki Bot Login
			await wiki.page('Node_Test_page'); //First call to do edit
			await wiki.edit(pagetext, { bot: 1, minor: 1, nocreate: 1, summary: 'test edit' }); //Edit Page nocreate: 1
			//await wiki.edit(pagetext, { bot: 1, minor: 1, createonly: 1, summary: 'test edit' }); //Create Page createonly: 1
		} catch(err) {
			console.log(err);
		}
	})();*/
	res.send('Page Text: '+pagetext +' Decoded Token: '+ username);
	//res.send('Successfully Edited '+ new Date());
	//res.json({date: 'Successfully Logged In '+ new Date()});
}
exports.wikiPageCreate = (req, res) => {
	pagetitle = 'Wiki Api Test 4';
        (async () => {
                try {
                const wiki = new WikiApi('')
                        await wiki.login('', ''); //Wiki Bot Login
                        await wiki.page(pagetitle); //First call to do edit
                        await wiki.edit('Testing only content of page', { bot: 1, minor: 1, createonly: 1, summary: 'test edit' }); //Create Page createonly: 1
			res.json({
				"response": {
				     "code": 200,
				     "pagetitle": pagetitle,
				     "message": "Successfully created your wiki page."
				}
			});
                } catch(err) {
                        console.log(err);
                }
        })();
}
