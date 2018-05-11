class ThreatItem{

  constructor(link, status, threatType, threatEntryType){

    this.__link = link;
    this.__threatType = threatType;
    this.__status = status;
    this.__threatEntryType = threatEntryType;
  }

  set link(link){
    this.__link = link;
  }

  get link(){
    return this.__link;
  }

  set status(status){
    this.__status = status;
  }

  get status(){
    return this.__status;
  }

  set threatType(threatType){
    this.__threatType = threatType;
  }

  get threatType(){
    return this.__threatType;
  }

  set threatEntryType(threatEntryType){
    this.__threatEntryType = threatEntryType;
  }

  get threatEntryType(){
    return this.__threatType;
  }
}

export default ThreatItem;
