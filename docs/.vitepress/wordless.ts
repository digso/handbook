import MarkdownIt from "markdown-it"

/** 需要在单词之间添加空格的常见语言的Unicode编码。 */
const wordfulCharRanges: [number, number][] = [
  [0x0000, 0x0e00], // 拉丁、西里尔、阿拉伯、希伯来等字母(泰语字母之前)
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
  md.renderer.rules.softbreak = function (tokens) {
    if (tokens.length === 3) {
      const before = lastCharCode(tokens[0].content)
      const after = firstCharCode(tokens[2].content)
      if (isWordfulChar(before) && isWordfulChar(after)) {
        return " "
      }
    }
    return ""
  }
}

/** 优化Markdown中的中文换行以及中英文和数字之间添加空格。 */
export function wordless(md: MarkdownIt) {
  optimizeLineBreak(md)
}
