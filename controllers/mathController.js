const History = require('../models/history');
const math = require("mathjs");


const handleHistory = async (obj) => {
  const createdAns = new History(obj);
  try {
    const savedAns = await createdAns.save();
    console.log(savedAns);
  } catch (error) {
    return false;
  }
};

async function performOperation(req, res) {
  let args = req.params[0];
  console.log(args);
  args = args.split("/");
  let str = "";
  for (var i = 0; i < args.length; i++) {
    if (args[i] === "plus") {
      str = str + "+";
    } else if (args[i] === "minus") {
      str = str + "-";
    } else if (args[i] === "into") {
      str = str + "*";
    } else if (args[i] === "by") {
      str = str + "/";
    } else {
      str = str + args[i];
    }
  }

  const result = math.evaluate(str);
  handleHistory({ question: str, ans: result });
  res.json({ question: str, ans: result });
}

async function displayOperations(req,res){
  const htmlContent =
    "<ul><li>/history</li><li>/5/plus/3</li><li>/3/minus/5</li><li>/3/minus/5/plus/8</li><li>/3/into/5/plus/8/into/6</li></ul>";
  res.send(htmlContent);
}

async function history(req,res){
  try {
    const history = await History.find().sort({ createdAt: -1 }).limit(20);
    console.log(history);
    const tempArr = [];
    history.forEach((item) => {
      tempArr.push({ question: item.question, ans: item.ans });
    });
    return res.send(tempArr);
  } catch (error) {
    return res.send(error);
  }
}

module.exports = { performOperation, displayOperations, history };
