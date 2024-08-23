import {default as MarkdownIt} from "markdown-it"

/** 需要在单词之间添加空格的常见语言的Unicode编码编码。 */
const wordfulCharRanges: [number, number][] = [
  [0x0000, 0x0e00], // 拉丁、西里尔、阿拉伯、希伯来等字母(泰语字母之前)
]

/** 中文字符(包括简繁体特殊字符和假名)的Unicode编码范围。 */
const chineseCharRanges: [number, number][] = [
  // [0x2e80, 0x2eff], // 部首补充
  // [0x2f00, 0x2fdf], // 康熙部首
  [0x2e80, 0x2fdf],

  // [0x3040, 0x309f], // 平假名
  // [0x30a0, 0x30ff], // 片假名
  [0x3040, 0x30ff],

  [0x3100, 0x312f], // 传统拼音注音符号
  [0x3190, 0x319f], // 甲乙丙丁天地人...
  [0x31a0, 0x31bf], // 传统拼音注音字母

  // [0x31c0, 0x31ef], // 笔画
  // [0x31f0, 0x31ff], // 片假名扩展
  // [0x3200, 0x32ff], // 带圈符号
  // [0x3300, 0x33ff], // 方形符号
  // [0x3400, 0x4dbf], // 汉字扩展A
  // [0x4dc0, 0x4dff], // 易经卦象
  // [0x4e00, 0x9fff], // 常用汉字
  [0x31c0, 0x9fff],

  [0xf900, 0xfaff], // 兼容汉字
  [0x1aff0, 0x1b16f], // 假名扩展

  // [0x1d300, 0x1d35f], // 太玄经符号
  // [0x1d360, 0x1d37f], // 算筹
  [0x1d300, 0x1d37f],

  [0x20000, 0x2a6df], // 汉字扩展B
  [0x2a700, 0x2ee5f], // 汉字扩展C~F
  [0x2f800, 0x2fa1f], // 兼容汉字扩展
  [0x30000, 0x323af], // 汉字扩展G~H
]

/** 根据单个字符的Unicode编码判断是否是用空格分割单词的语言。 */
function isWordfulChar(charCode: number) {
  for (const [start, end] of wordfulCharRanges) {
    if (charCode >= start && charCode <= end) {
      return true
    }
  }
  return false
}

/** 根据单个字符的Unicode编码判断是否是中文相关字符。 */
function isChineseChar(charCode: number) {
  for (const [start, end] of chineseCharRanges) {
    if (charCode >= start && charCode <= end) {
      return true
    }
  }
  return false
}

function firstCharCode(raw: string) {
  return raw.charCodeAt(0)
}

function lastCharCode(raw: string) {
  return raw.charCodeAt(raw.length - 1)
}

/**
 * 换行的时候如果前后都是以空格分割单词的语言(例如英文)则添加空格。
 * 这里是在避免对中文内容添加额外的空格。
 */
export function optimizeLineBreak(md: MarkdownIt) {
  md.renderer.rules.softbreak = function (tokens, index) {
    const before = lastCharCode(tokens[index - 1].content)
    const after = firstCharCode(tokens[index + 1].content)
    if (isWordfulChar(before) && isWordfulChar(after)) {
      return " "
    }
    return ""
  }
}

/**
 * 在语言切换的时候添加空格，
 * 这里主要是在中文和英文切换的时候添加额外空格。
 */
export function optimizeLanguageChangeBreak(md: MarkdownIt) {
  md.renderer.rules.text = function (tokens, index) {
    const content = tokens[index].content
    let handler = ""
    let lastCutIndex = 0
    let lastCharIsChinese = isChineseChar(content.charCodeAt(0))
    for (let i = 1; i < content.length; i++) {
      const charIsChinese = isChineseChar(content.charCodeAt(i))
      if (charIsChinese !== lastCharIsChinese) {
        const cutIndex = i
        handler = content.substring(lastCutIndex, cutIndex) + " "
        lastCutIndex = cutIndex
      }
      lastCharIsChinese = charIsChinese
    }
    return handler + content.substring(lastCutIndex)
  }
}

/** 优化Markdown中的中文换行以及中英文和数字之间添加空格。 */
export function wordless(md: MarkdownIt) {
  optimizeLineBreak(md)
  optimizeLanguageChangeBreak(md)
}
