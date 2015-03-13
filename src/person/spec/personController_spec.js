import PersonController from 'person/personController';

describe('PersonController', () => {

  // set your global test vars here.
  var $q,
      $timeout,
      PersonFactory,
      MockPersonFactory,
      controller;
    
  // set up the person factory mock
  beforeEach(() => {
      MockPersonFactory = function () {
         return function(data) {
            return {
               get: sinon.stub().resolves({
                firstName: 'John',
                lastName: 'Smith'
               }),
               loadHistory: sinon.stub().resolves([{
                id: 1,
                text: 'John logged in.'
               },
               {
                id: 2,
                text: 'John added a task.'
               }]),
               id: data.id,
               firstName: null,
               lastName: null,
               fullName: null
            }
         }
      }
  });
    
  // set up the angular mocks
  beforeEach(() => {
      // provide the personfactory
      module(($provide) => {
        $provide.factory('PersonFactory', MockPersonFactory);
      });
  
      // you can surround any injected dependencies with _ _ and    // the injector will throw them away, it's just to        // differentiate between variables that you might want to     // use for tests.
      inject((_$q_, _$timeout_, _PersonFactory_) => {
         $q = _$q_;
         
         // having $timeout is often useful for testing that
         // promises have been fulfilled
         $timeout = _$timeout_;
         
         // set up sinon-as-promised, otherwise it won't work!
         sinonAsPromised($q);

         PersonFactory = _PersonFactory_;
      });
  });
  
  // set up your controller using mocked dependencies
  beforeEach(() => {
      controller = new PersonController($q, PersonFactory);
  });

  it('.loadPerson() - should load a person', () => {

    // spy on setfullname
    sinon.spy(controller, 'setFullName');

    // make sure to flush the promises
    controller.loadPerson();
    $timeout.flush();
    
    expect(controller.person.fullName).to.eq('John Smith');
    expect(controller.setFullName.called).to.eq(true);
        
    // restore setfullname
    controller.setFullName.restore();
  });

  it('.loadPersonHistory() - should load all of the persons app history', () => {

    // make sure to flush the promises
    controller.loadPerson();
    controller.loadPersonHistory().then((history) => {
      expect(history.length).to.be.greaterThan(0);
      expect(history[0]).to.eql({
        id: 1,
        text: 'John logged in.'
      }); // deep equal using chai
    });
    $timeout.flush();
  });

  it('#setFullName() - can set the full name of the person using a firstName and a lastName', () => {
    let fullName = controller.setFullName('Mary', 'Jones');
    expect(fullName).to.eq('Mary Jones');
  });
});