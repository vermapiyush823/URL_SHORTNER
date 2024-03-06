const shortid = require('shortid');
const URL = require('../models/url')

async function generateNewShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error:'url is required'});
    const shortId = shortid();
    await URL.create({
        shortId:shortId,
        redirectURL:body.url,
        visitHistory:[],
    }
    )

    return res.json({id:shortId})
}

async function getAnalysis(req, res){
    const shortId = req.params.shortId;
    URL.findOne({ shortId }).then((entry) => {
        res.json({ totalClicks: entry.visitHistory.length });
    });
}

module.exports = {generateNewShortURL,getAnalysis}