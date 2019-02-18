module.exports = class resultObject {
  constructor(title, content) {
    this.local_title = title;
    this.local_content = content;
  }

  get title() {
    return this.local_title;
  }

  set title(value) {
    this.local_title = value;
  }

  get content() {
    return this.local_content;
  }

  set content(value) {
    this.local_content = value;
  }
};
