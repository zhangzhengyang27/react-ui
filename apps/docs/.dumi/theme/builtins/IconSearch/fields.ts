import type { IconType } from '../../icons'
import {
    AiOutlineArrowDown,
    AiOutlineArrowLeft,
    AiOutlineArrowRight,
    AiOutlineArrowUp,
    AiOutlineArrowsAlt,
    AiOutlineBackward,
    AiOutlineBorderInner,
    AiOutlineBorderOuter,
    AiOutlineCaretDown,
    AiOutlineCaretLeft,
    AiOutlineCaretRight,
    AiOutlineCaretUp,
    AiOutlineDoubleLeft,
    AiOutlineDoubleRight,
    AiOutlineDown,
    AiOutlineDownload,
    AiOutlineEnter,
    AiOutlineFastBackward,
    AiOutlineFastForward,
    AiOutlineForward,
    AiOutlineFullscreen,
    AiOutlineFullscreenExit,
    AiOutlineLeft,
    AiOutlineLogin,
    AiOutlineLogout,
    AiOutlineMenuFold,
    AiOutlineMenuUnfold,
    AiOutlinePicCenter,
    AiOutlinePicLeft,
    AiOutlinePicRight,
    AiOutlinePlayCircle,
    AiOutlineRetweet,
    AiOutlineRight,
    AiOutlineRollback,
    AiOutlineShrink,
    AiOutlineStepBackward,
    AiOutlineStepForward,
    AiOutlineSwap,
    AiOutlineUp
} from '../../icons'

import {
    AiOutlineCheck,
    AiOutlineCheckCircle,
    AiOutlineCheckSquare,
    AiOutlineClockCircle,
    AiOutlineClose,
    AiOutlineCloseCircle,
    AiOutlineCloseSquare,
    AiOutlineExclamation,
    AiOutlineExclamationCircle,
    AiOutlineInfo,
    AiOutlineInfoCircle,
    AiOutlineMinus,
    AiOutlineMinusCircle,
    AiOutlineMinusSquare,
    AiOutlinePause,
    AiOutlinePauseCircle,
    AiOutlinePlus,
    AiOutlinePlusCircle,
    AiOutlinePlusSquare,
    AiOutlineQuestion,
    AiOutlineQuestionCircle,
    AiOutlineStop,
    AiOutlineWarning
} from '../../icons'

import {
    AiOutlineAlignCenter,
    AiOutlineAlignLeft,
    AiOutlineAlignRight,
    AiOutlineBgColors,
    AiOutlineBold,
    AiOutlineCopy,
    AiOutlineDelete,
    AiOutlineDiff,
    AiOutlineDrag,
    AiOutlineEdit,
    AiOutlineFontColors,
    AiOutlineFontSize,
    AiOutlineHighlight,
    AiOutlineItalic,
    AiOutlineLineHeight,
    AiOutlineOrderedList,
    AiOutlineRedo,
    AiOutlineScissor,
    AiOutlineSortAscending,
    AiOutlineSortDescending,
    AiOutlineStrikethrough,
    AiOutlineUnderline,
    AiOutlineUndo,
    AiOutlineUnorderedList,
    AiOutlineZoomIn,
    AiOutlineZoomOut
} from '../../icons'

import {
    AiOutlineAreaChart,
    AiOutlineBarChart,
    AiOutlineBoxPlot,
    AiOutlineDotChart,
    AiOutlineFall,
    AiOutlineFund,
    AiOutlineHeatMap,
    AiOutlineLineChart,
    AiOutlinePieChart,
    AiOutlineRadarChart,
    AiOutlineRise,
    AiOutlineSliders,
    AiOutlineStock
} from '../../icons'

import {
    AiFillAlipayCircle,
    AiFillAndroid,
    AiFillApple,
    AiFillBehanceCircle,
    AiFillChrome,
    AiFillCodeSandboxCircle,
    AiFillCodepenCircle,
    AiFillDiscord,
    AiFillDribbbleCircle,
    AiFillFacebook,
    AiFillGithub,
    AiFillGitlab,
    AiFillHtml5,
    AiFillInstagram,
    AiFillLinkedin,
    AiFillPayCircle,
    AiFillPinterest,
    AiFillSkype,
    AiFillSnippets,
    AiFillSpotify,
    AiFillTaobaoCircle,
    AiFillTikTok,
    AiFillTwitch,
    AiFillWechat,
    AiFillWeiboSquare,
    AiFillWindows,
    AiFillYoutube,
    AiOutlineAlipay,
    AiOutlineAliyun,
    AiOutlineAntDesign,
    AiOutlineBilibili,
    AiOutlineDingding,
    AiOutlineDribbble,
    AiOutlineGithub,
    AiOutlineJava,
    AiOutlineJavaScript,
    AiOutlinePython,
    AiOutlineRuby,
    AiOutlineSketch,
    AiOutlineSlack,
    AiOutlineTwitch,
    AiOutlineYoutube,
    AiOutlineZhihu
} from '../../icons'

export interface IconEntry {
    name: string
    Component: IconType
    category: CategoriesKeys
    tags: string[]
}

export const categories = {
    direction: '方向',
    suggestion: '建议',
    editor: '编辑',
    data: '数据',
    logo: '品牌',
    other: '其他'
} as const

export type Categories = typeof categories
export type CategoriesKeys = keyof Categories

const directionIcons: IconEntry[] = [
    { name: 'AiOutlineArrowDown', Component: AiOutlineArrowDown, category: 'direction', tags: ['arrow', 'down'] },
    { name: 'AiOutlineArrowLeft', Component: AiOutlineArrowLeft, category: 'direction', tags: ['arrow', 'left'] },
    { name: 'AiOutlineArrowRight', Component: AiOutlineArrowRight, category: 'direction', tags: ['arrow', 'right'] },
    { name: 'AiOutlineArrowUp', Component: AiOutlineArrowUp, category: 'direction', tags: ['arrow', 'up'] },
    { name: 'AiOutlineBackward', Component: AiOutlineBackward, category: 'direction', tags: ['backward'] },
    { name: 'AiOutlineCaretDown', Component: AiOutlineCaretDown, category: 'direction', tags: ['caret', 'down'] },
    { name: 'AiOutlineCaretLeft', Component: AiOutlineCaretLeft, category: 'direction', tags: ['caret', 'left'] },
    { name: 'AiOutlineCaretRight', Component: AiOutlineCaretRight, category: 'direction', tags: ['caret', 'right'] },
    { name: 'AiOutlineCaretUp', Component: AiOutlineCaretUp, category: 'direction', tags: ['caret', 'up'] },
    { name: 'AiOutlineDoubleLeft', Component: AiOutlineDoubleLeft, category: 'direction', tags: ['double', 'left'] },
    { name: 'AiOutlineDoubleRight', Component: AiOutlineDoubleRight, category: 'direction', tags: ['double', 'right'] },
    { name: 'AiOutlineDown', Component: AiOutlineDown, category: 'direction', tags: ['down'] },
    { name: 'AiOutlineDownload', Component: AiOutlineDownload, category: 'direction', tags: ['download'] },
    { name: 'AiOutlineEnter', Component: AiOutlineEnter, category: 'direction', tags: ['enter'] },
    {
        name: 'AiOutlineFastBackward',
        Component: AiOutlineFastBackward,
        category: 'direction',
        tags: ['fast', 'backward']
    },
    { name: 'AiOutlineFastForward', Component: AiOutlineFastForward, category: 'direction', tags: ['fast', 'forward'] },
    { name: 'AiOutlineForward', Component: AiOutlineForward, category: 'direction', tags: ['forward'] },
    { name: 'AiOutlineFullscreen', Component: AiOutlineFullscreen, category: 'direction', tags: ['fullscreen'] },
    {
        name: 'AiOutlineFullscreenExit',
        Component: AiOutlineFullscreenExit,
        category: 'direction',
        tags: ['fullscreen', 'exit']
    },
    { name: 'AiOutlineLeft', Component: AiOutlineLeft, category: 'direction', tags: ['left'] },
    { name: 'AiOutlineLogin', Component: AiOutlineLogin, category: 'direction', tags: ['login'] },
    { name: 'AiOutlineLogout', Component: AiOutlineLogout, category: 'direction', tags: ['logout'] },
    { name: 'AiOutlineMenuFold', Component: AiOutlineMenuFold, category: 'direction', tags: ['menu', 'fold'] },
    { name: 'AiOutlineMenuUnfold', Component: AiOutlineMenuUnfold, category: 'direction', tags: ['menu', 'unfold'] },
    { name: 'AiOutlinePlayCircle', Component: AiOutlinePlayCircle, category: 'direction', tags: ['play', 'circle'] },
    { name: 'AiOutlineRetweet', Component: AiOutlineRetweet, category: 'direction', tags: ['retweet'] },
    { name: 'AiOutlineRight', Component: AiOutlineRight, category: 'direction', tags: ['right'] },
    { name: 'AiOutlineRollback', Component: AiOutlineRollback, category: 'direction', tags: ['rollback'] },
    { name: 'AiOutlineShrink', Component: AiOutlineShrink, category: 'direction', tags: ['shrink'] },
    {
        name: 'AiOutlineStepBackward',
        Component: AiOutlineStepBackward,
        category: 'direction',
        tags: ['step', 'backward']
    },
    { name: 'AiOutlineStepForward', Component: AiOutlineStepForward, category: 'direction', tags: ['step', 'forward'] },
    { name: 'AiOutlineSwap', Component: AiOutlineSwap, category: 'direction', tags: ['swap'] },
    { name: 'AiOutlineUp', Component: AiOutlineUp, category: 'direction', tags: ['up'] },
    { name: 'AiOutlineArrowsAlt', Component: AiOutlineArrowsAlt, category: 'direction', tags: ['arrows', 'alt'] },
    { name: 'AiOutlineBorderOuter', Component: AiOutlineBorderOuter, category: 'direction', tags: ['border', 'outer'] },
    { name: 'AiOutlineBorderInner', Component: AiOutlineBorderInner, category: 'direction', tags: ['border', 'inner'] },
    { name: 'AiOutlinePicCenter', Component: AiOutlinePicCenter, category: 'direction', tags: ['pic', 'center'] },
    { name: 'AiOutlinePicLeft', Component: AiOutlinePicLeft, category: 'direction', tags: ['pic', 'left'] },
    { name: 'AiOutlinePicRight', Component: AiOutlinePicRight, category: 'direction', tags: ['pic', 'right'] }
]

const suggestionIcons: IconEntry[] = [
    { name: 'AiOutlineCheck', Component: AiOutlineCheck, category: 'suggestion', tags: ['check', 'done', 'tick'] },
    {
        name: 'AiOutlineCheckCircle',
        Component: AiOutlineCheckCircle,
        category: 'suggestion',
        tags: ['check', 'circle', 'success']
    },
    {
        name: 'AiOutlineCheckSquare',
        Component: AiOutlineCheckSquare,
        category: 'suggestion',
        tags: ['check', 'square']
    },
    { name: 'AiOutlineClose', Component: AiOutlineClose, category: 'suggestion', tags: ['close', 'x'] },
    {
        name: 'AiOutlineCloseCircle',
        Component: AiOutlineCloseCircle,
        category: 'suggestion',
        tags: ['close', 'circle']
    },
    {
        name: 'AiOutlineCloseSquare',
        Component: AiOutlineCloseSquare,
        category: 'suggestion',
        tags: ['close', 'square']
    },
    {
        name: 'AiOutlineClockCircle',
        Component: AiOutlineClockCircle,
        category: 'suggestion',
        tags: ['clock', 'circle', 'time']
    },
    {
        name: 'AiOutlineExclamation',
        Component: AiOutlineExclamation,
        category: 'suggestion',
        tags: ['exclamation', 'warn']
    },
    {
        name: 'AiOutlineExclamationCircle',
        Component: AiOutlineExclamationCircle,
        category: 'suggestion',
        tags: ['exclamation', 'circle']
    },
    { name: 'AiOutlineInfo', Component: AiOutlineInfo, category: 'suggestion', tags: ['info'] },
    { name: 'AiOutlineInfoCircle', Component: AiOutlineInfoCircle, category: 'suggestion', tags: ['info', 'circle'] },
    { name: 'AiOutlineMinus', Component: AiOutlineMinus, category: 'suggestion', tags: ['minus', 'subtract'] },
    {
        name: 'AiOutlineMinusCircle',
        Component: AiOutlineMinusCircle,
        category: 'suggestion',
        tags: ['minus', 'circle']
    },
    {
        name: 'AiOutlineMinusSquare',
        Component: AiOutlineMinusSquare,
        category: 'suggestion',
        tags: ['minus', 'square']
    },
    { name: 'AiOutlinePause', Component: AiOutlinePause, category: 'suggestion', tags: ['pause'] },
    {
        name: 'AiOutlinePauseCircle',
        Component: AiOutlinePauseCircle,
        category: 'suggestion',
        tags: ['pause', 'circle']
    },
    { name: 'AiOutlinePlus', Component: AiOutlinePlus, category: 'suggestion', tags: ['plus', 'add'] },
    { name: 'AiOutlinePlusCircle', Component: AiOutlinePlusCircle, category: 'suggestion', tags: ['plus', 'circle'] },
    { name: 'AiOutlinePlusSquare', Component: AiOutlinePlusSquare, category: 'suggestion', tags: ['plus', 'square'] },
    { name: 'AiOutlineQuestion', Component: AiOutlineQuestion, category: 'suggestion', tags: ['question', 'help'] },
    {
        name: 'AiOutlineQuestionCircle',
        Component: AiOutlineQuestionCircle,
        category: 'suggestion',
        tags: ['question', 'circle', 'help']
    },
    { name: 'AiOutlineStop', Component: AiOutlineStop, category: 'suggestion', tags: ['stop'] },
    { name: 'AiOutlineWarning', Component: AiOutlineWarning, category: 'suggestion', tags: ['warning', 'warn'] }
]

const editorIcons: IconEntry[] = [
    { name: 'AiOutlineAlignCenter', Component: AiOutlineAlignCenter, category: 'editor', tags: ['align', 'center'] },
    { name: 'AiOutlineAlignLeft', Component: AiOutlineAlignLeft, category: 'editor', tags: ['align', 'left'] },
    { name: 'AiOutlineAlignRight', Component: AiOutlineAlignRight, category: 'editor', tags: ['align', 'right'] },
    {
        name: 'AiOutlineBgColors',
        Component: AiOutlineBgColors,
        category: 'editor',
        tags: ['bg', 'colors', 'background']
    },
    { name: 'AiOutlineBold', Component: AiOutlineBold, category: 'editor', tags: ['bold'] },
    { name: 'AiOutlineCopy', Component: AiOutlineCopy, category: 'editor', tags: ['copy'] },
    { name: 'AiOutlineDelete', Component: AiOutlineDelete, category: 'editor', tags: ['delete', 'trash'] },
    { name: 'AiOutlineDiff', Component: AiOutlineDiff, category: 'editor', tags: ['diff'] },
    { name: 'AiOutlineDrag', Component: AiOutlineDrag, category: 'editor', tags: ['drag'] },
    { name: 'AiOutlineEdit', Component: AiOutlineEdit, category: 'editor', tags: ['edit'] },
    { name: 'AiOutlineFontColors', Component: AiOutlineFontColors, category: 'editor', tags: ['font', 'colors'] },
    { name: 'AiOutlineFontSize', Component: AiOutlineFontSize, category: 'editor', tags: ['font', 'size'] },
    { name: 'AiOutlineHighlight', Component: AiOutlineHighlight, category: 'editor', tags: ['highlight'] },
    { name: 'AiOutlineItalic', Component: AiOutlineItalic, category: 'editor', tags: ['italic'] },
    { name: 'AiOutlineLineHeight', Component: AiOutlineLineHeight, category: 'editor', tags: ['line', 'height'] },
    { name: 'AiOutlineOrderedList', Component: AiOutlineOrderedList, category: 'editor', tags: ['ordered', 'list'] },
    { name: 'AiOutlineRedo', Component: AiOutlineRedo, category: 'editor', tags: ['redo'] },
    { name: 'AiOutlineScissor', Component: AiOutlineScissor, category: 'editor', tags: ['scissor', 'cut'] },
    {
        name: 'AiOutlineSortAscending',
        Component: AiOutlineSortAscending,
        category: 'editor',
        tags: ['sort', 'ascending']
    },
    {
        name: 'AiOutlineSortDescending',
        Component: AiOutlineSortDescending,
        category: 'editor',
        tags: ['sort', 'descending']
    },
    { name: 'AiOutlineStrikethrough', Component: AiOutlineStrikethrough, category: 'editor', tags: ['strikethrough'] },
    { name: 'AiOutlineUnderline', Component: AiOutlineUnderline, category: 'editor', tags: ['underline'] },
    { name: 'AiOutlineUndo', Component: AiOutlineUndo, category: 'editor', tags: ['undo'] },
    {
        name: 'AiOutlineUnorderedList',
        Component: AiOutlineUnorderedList,
        category: 'editor',
        tags: ['unordered', 'list']
    },
    { name: 'AiOutlineZoomIn', Component: AiOutlineZoomIn, category: 'editor', tags: ['zoom', 'in'] },
    { name: 'AiOutlineZoomOut', Component: AiOutlineZoomOut, category: 'editor', tags: ['zoom', 'out'] }
]

const dataIcons: IconEntry[] = [
    { name: 'AiOutlineAreaChart', Component: AiOutlineAreaChart, category: 'data', tags: ['area', 'chart'] },
    { name: 'AiOutlineBarChart', Component: AiOutlineBarChart, category: 'data', tags: ['bar', 'chart'] },
    { name: 'AiOutlineBoxPlot', Component: AiOutlineBoxPlot, category: 'data', tags: ['box', 'plot'] },
    { name: 'AiOutlineDotChart', Component: AiOutlineDotChart, category: 'data', tags: ['dot', 'chart'] },
    { name: 'AiOutlineFall', Component: AiOutlineFall, category: 'data', tags: ['fall', 'down'] },
    { name: 'AiOutlineFund', Component: AiOutlineFund, category: 'data', tags: ['fund'] },
    { name: 'AiOutlineHeatMap', Component: AiOutlineHeatMap, category: 'data', tags: ['heat', 'map'] },
    { name: 'AiOutlineLineChart', Component: AiOutlineLineChart, category: 'data', tags: ['line', 'chart'] },
    { name: 'AiOutlinePieChart', Component: AiOutlinePieChart, category: 'data', tags: ['pie', 'chart'] },
    { name: 'AiOutlineRadarChart', Component: AiOutlineRadarChart, category: 'data', tags: ['radar', 'chart'] },
    { name: 'AiOutlineRise', Component: AiOutlineRise, category: 'data', tags: ['rise', 'up'] },
    { name: 'AiOutlineSliders', Component: AiOutlineSliders, category: 'data', tags: ['sliders'] },
    { name: 'AiOutlineStock', Component: AiOutlineStock, category: 'data', tags: ['stock'] }
]

const logoIcons: IconEntry[] = [
    { name: 'AiFillAlipayCircle', Component: AiFillAlipayCircle, category: 'logo', tags: ['alipay'] },
    { name: 'AiFillAndroid', Component: AiFillAndroid, category: 'logo', tags: ['android'] },
    { name: 'AiFillApple', Component: AiFillApple, category: 'logo', tags: ['apple'] },
    { name: 'AiFillBehanceCircle', Component: AiFillBehanceCircle, category: 'logo', tags: ['behance'] },
    { name: 'AiFillChrome', Component: AiFillChrome, category: 'logo', tags: ['chrome'] },
    { name: 'AiFillCodepenCircle', Component: AiFillCodepenCircle, category: 'logo', tags: ['codepen'] },
    { name: 'AiFillCodeSandboxCircle', Component: AiFillCodeSandboxCircle, category: 'logo', tags: ['codesandbox'] },
    { name: 'AiFillDiscord', Component: AiFillDiscord, category: 'logo', tags: ['discord'] },
    { name: 'AiFillDribbbleCircle', Component: AiFillDribbbleCircle, category: 'logo', tags: ['dribbble'] },
    { name: 'AiFillFacebook', Component: AiFillFacebook, category: 'logo', tags: ['facebook'] },
    { name: 'AiFillGithub', Component: AiFillGithub, category: 'logo', tags: ['github'] },
    { name: 'AiFillGitlab', Component: AiFillGitlab, category: 'logo', tags: ['gitlab'] },
    { name: 'AiFillHtml5', Component: AiFillHtml5, category: 'logo', tags: ['html5'] },
    { name: 'AiFillInstagram', Component: AiFillInstagram, category: 'logo', tags: ['instagram'] },
    { name: 'AiFillLinkedin', Component: AiFillLinkedin, category: 'logo', tags: ['linkedin'] },
    { name: 'AiFillPayCircle', Component: AiFillPayCircle, category: 'logo', tags: ['pay'] },
    { name: 'AiFillPinterest', Component: AiFillPinterest, category: 'logo', tags: ['pinterest'] },
    { name: 'AiFillSkype', Component: AiFillSkype, category: 'logo', tags: ['skype'] },
    { name: 'AiFillSpotify', Component: AiFillSpotify, category: 'logo', tags: ['spotify'] },
    { name: 'AiFillTaobaoCircle', Component: AiFillTaobaoCircle, category: 'logo', tags: ['taobao'] },
    { name: 'AiFillTikTok', Component: AiFillTikTok, category: 'logo', tags: ['tiktok'] },
    { name: 'AiFillTwitch', Component: AiFillTwitch, category: 'logo', tags: ['twitch'] },
    { name: 'AiFillWechat', Component: AiFillWechat, category: 'logo', tags: ['wechat'] },
    { name: 'AiFillWeiboSquare', Component: AiFillWeiboSquare, category: 'logo', tags: ['weibo', 'square'] },
    { name: 'AiFillWindows', Component: AiFillWindows, category: 'logo', tags: ['windows'] },
    { name: 'AiFillYoutube', Component: AiFillYoutube, category: 'logo', tags: ['youtube'] },
    { name: 'AiOutlineAliyun', Component: AiOutlineAliyun, category: 'logo', tags: ['aliyun'] },
    { name: 'AiOutlineAlipay', Component: AiOutlineAlipay, category: 'logo', tags: ['alipay'] },
    { name: 'AiOutlineAntDesign', Component: AiOutlineAntDesign, category: 'logo', tags: ['ant', 'design'] },
    { name: 'AiOutlineBilibili', Component: AiOutlineBilibili, category: 'logo', tags: ['bilibili'] },
    { name: 'AiOutlineDingding', Component: AiOutlineDingding, category: 'logo', tags: ['dingding'] },
    { name: 'AiOutlineDribbble', Component: AiOutlineDribbble, category: 'logo', tags: ['dribbble'] },
    { name: 'AiOutlineGithub', Component: AiOutlineGithub, category: 'logo', tags: ['github'] },
    { name: 'AiOutlineJava', Component: AiOutlineJava, category: 'logo', tags: ['java'] },
    { name: 'AiOutlineJavaScript', Component: AiOutlineJavaScript, category: 'logo', tags: ['javascript', 'js'] },
    { name: 'AiOutlinePython', Component: AiOutlinePython, category: 'logo', tags: ['python'] },
    { name: 'AiOutlineRuby', Component: AiOutlineRuby, category: 'logo', tags: ['ruby'] },
    { name: 'AiOutlineSlack', Component: AiOutlineSlack, category: 'logo', tags: ['slack'] },
    { name: 'AiOutlineSketch', Component: AiOutlineSketch, category: 'logo', tags: ['sketch'] },
    { name: 'AiOutlineTwitch', Component: AiOutlineTwitch, category: 'logo', tags: ['twitch'] },
    { name: 'AiOutlineYoutube', Component: AiOutlineYoutube, category: 'logo', tags: ['youtube'] },
    { name: 'AiOutlineZhihu', Component: AiOutlineZhihu, category: 'logo', tags: ['zhihu'] }
]

export const allIcons: IconEntry[] = [...directionIcons, ...suggestionIcons, ...editorIcons, ...dataIcons, ...logoIcons]

export default categories
