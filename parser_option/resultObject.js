class resultObject{
  constructor(title, content){
    this.title = title;
    this.content = content;
  }

  get title() {
    return this.title;
  }

  set title(value) {
    this.title = value;
  }

  get content() {
    return this.content;
  }

  set content(value) {
    this.content = value;
  }
}
