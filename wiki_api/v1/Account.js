const WikiApi = require('wikiapi')
const db = require('../database');
require('dotenv').config();
const apiUrl = process.env.WIKI_API;

exports.wikiAccountLogin = (req, res) => {
	username = req.params.user;
        password = req.params.pass;
	(async () => {
		try {
		/*const wiki = new WikiApi('https://iskomunidad.upd.edu.ph/api.php');
		let page_data = await wiki.data('Q1');
		console.log("Wiki: " + page_data);*/
		const wiki = new WikiApi(apiUrl)
		let page_data = await wiki.data('Q1');
		console.log(page_data.labels.zh)
		} catch(err) {
			console.log(err);
		}
	})();
	//res.send('Successfully Logged In '+ new Date());
	res.json({date: 'Successfully Logged In '+ new Date()});
}
exports.checkAccount = async (req, res) => {
	try {
		const result = await db.query({rowMode: 'array', text: 'SELECT * FROM wiki_user'});
		//const result = await db.query('SELECT * FROM wiki_user');
		//res.status(200).send(result.rows[0].user_name);
		res.status(200).send(result.rows[0][3]); //[0][0] id not allowed to display

	} catch(err) {
		console.log(err);
	}
}
