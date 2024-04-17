import { getName } from "./getName";
import { katakanaHalfwidthToFullwidth } from "./katakanaHalfwidthToFullwidth";

export type nameConvertPrivate = {
  firstName: string;
  lastName: string;
  firstNameKana: string;
  lastNameKana: string;
};

type arrayNameRomaji = {
  [key: string]: string;
};

const katakanaToRomaji = (katakana: string) => {
  const kanaMap: arrayNameRomaji = {
    ア: "A",
    イ: "I",
    ウ: "U",
    エ: "E",
    オ: "O",
    カ: "K",
    キ: "K",
    ク: "K",
    ケ: "K",
    コ: "K",
    サ: "S",
    シ: "S",
    ス: "S",
    セ: "S",
    ソ: "S",
    タ: "T",
    チ: "C",
    ツ: "T",
    テ: "T",
    ト: "T",
    ナ: "N",
    ニ: "N",
    ヌ: "N",
    ネ: "N",
    ノ: "N",
    ハ: "H",
    ヒ: "H",
    フ: "F",
    ヘ: "H",
    ホ: "H",
    マ: "M",
    ミ: "M",
    ム: "M",
    メ: "M",
    モ: "M",
    ヤ: "Y",
    ユ: "Y",
    ヨ: "Y",
    ラ: "R",
    リ: "R",
    ル: "R",
    レ: "R",
    ロ: "R",
    ワ: "W",
    ヲ: "W",
    ン: "N",
    ガ: "G",
    ギ: "G",
    グ: "G",
    ゲ: "G",
    ゴ: "G",
    ザ: "Z",
    ジ: "J",
    ズ: "Z",
    ゼ: "Z",
    ゾ: "Z",
    ダ: "D",
    ヂ: "J",
    ヅ: "Z",
    デ: "D",
    ド: "D",
    バ: "B",
    ビ: "B",
    ブ: "B",
    ベ: "B",
    ボ: "B",
    パ: "P",
    ピ: "P",
    プ: "P",
    ペ: "P",
    ポ: "P",
  };

  const reg = new RegExp("(" + Object.keys(kanaMap).join("|") + ")", "g");
  return katakana
    .replace(reg, function (match) {
      return kanaMap[`${match}`];
    })
    .replace(/゛/g, "ﾞ")
    .replace(/゜/g, "ﾟ");
};

export const hideNameReview = (name: nameConvertPrivate) => {
  const allEmpty =
    name.firstName === "" &&
    name.lastName === "" &&
    name.firstNameKana === "" &&
    name.lastNameKana === "";
  if (allEmpty) {
    return "";
  }
  let nameParts, hiddenName;

  if (name.firstNameKana && name.lastNameKana) {
    nameParts = katakanaToRomaji(
      katakanaHalfwidthToFullwidth(
        getName(name.firstNameKana, name.lastNameKana),
      ),
    ).split(" ");
    const initials = nameParts.map((part) => part.charAt(0)).join("・");
    hiddenName = `${initials} 様`;
  } else {
    nameParts = getName(name.firstName, name.lastName).split(" ");

    const hiddenParts = nameParts.map((part, index) =>
      index === 0
        ? part.charAt(0) + "*".repeat(part.length - 1)
        : "*".repeat(part.length),
    );
    hiddenName = hiddenParts.join(" ");
  }
  return hiddenName;
};
