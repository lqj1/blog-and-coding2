module.exports = {
  // 可选类型
  types: [
    { value: 'feat', name: 'feat:     新功能' },
    { value: 'fix', name: 'fix:      修复' },
    { value: 'docs', name: 'docs:     文档变更' },
    {
      value: 'style',
      name: '代码格式(不影响代码运行的变更)'
    },
    {
      value: 'refactor',
      name: '重构'
    },
    {
      value: 'perf',
      name: '性能优化'
    },
    { value: 'test', name: '增加测试' },
    {
      value: 'chore',
      name: '构建过程或者辅助工具的变动'
    },
    { value: 'revert', name: '回退' },
    { value: 'build', name: '打包' }
  ],
  // 消息步骤
  message: {
    type: '请选择提交类型: ',
    customScope: '请输入修改范围(可选): ',
    subject: '请简要描述提交(可选): ',
    body: '请输入详细描述(可选): ',
    footer: '请输入要关闭的issue(可选): ',
    confirmCommit: '确认要使用以上信息提交?(y/n/e/h)'
  },
  // 跳过问题
  skipQuestions: ['body', 'footer'],
  // subject文字默认长度是 72
  subjectLimit: 72,
  scopes: [
    { name: 'accounts' },
    { name: 'admin' },
    { name: 'exampleScope' },
    { name: 'changeMe' }
  ],

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',

  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [

      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  skipQuestions: ['body']

  // limit subject length
  // breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
}
