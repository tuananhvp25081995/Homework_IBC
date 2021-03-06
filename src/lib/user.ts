import { Token } from '../models';
import { Request, Response } from "express";
import request = require('request-promise');

const keywords = ['Dưa hấu', 'Quả dưa chuột', 'Cà chua', 'Tuãn Anh'];
const allMessages: any[] = [];
const allContent: any[] = [];

export async function listArray(req: Request, res: Response) {
  const tokens: any = await Token.find({})
  req.params.id = tokens[0].id;
  const userFieldSet: string = 'feed';
  const newToken: any = await Token.find({});
  const options: any = {
    method: 'GET',
    uri: `https://graph.facebook.com/v4.0/${req.params.id}`,
    qs: {
      access_token: newToken[0].token,
      fields: userFieldSet
    }
  };

  request(options)
    .then((fbRes: any) => {
      let content: any = JSON.parse(fbRes).feed.data;
      content.forEach((message: any) => {
        if (message.message !== undefined) {
          allMessages.push(message.message);
        }
      });
      for (let i = 0; i < allMessages.length; i++) {
        for (let j = 0; j < keywords.length; j++) {
          if (allMessages[i].includes(keywords[j]) === true) {
            allContent.push(allMessages[i]);
          }
        }
      }
      res.json(allContent)
    })
}