class ThreatHeader{
  constructor(col1, col2, col3, col4, col5){
    this.__col1 = col1;
    this.__col2 = col2;
    this.__col3 = col3;
    this.__col4 = col4;
    this.__col5 = col5;
  }

  toArray(){
    return [
      this.__col2,
      this.__col3,
      this.__col4,
      this.__col5
    ]
  }

  get col1(){
    return this.__col1;
  }
  get col2(){
    return this.__col2;
  }
  get col3(){
    return this.__col3;
  }
  get col4(){
    return this.__col4;
  }
  get col5(){
    return this.__col5;
  }
}

export default ThreatHeader;
