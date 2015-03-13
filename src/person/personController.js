class PersonController {
  constructor($q, PersonFactory) {
    this.$q = $q;
    this.person = new PersonFactory({
        id: 1
    });
    this.PersonFactory = PersonFactory;
  }
  
  loadPerson() {
    this.person.get().then((result) => {
      this.person.fullName = this.setFullName(result.firstName, result.lastName);
    });
  }
  
  loadPersonHistory() {
    let deferred = this.$q.defer();
    this.person.loadHistory().then((history) => {
      deferred.resolve(history);
    });
    return deferred.promise;
  }
  
  setFullName(firstName, lastName) {
    return firstName + ' ' + lastName;
  }
}

export default PersonController;