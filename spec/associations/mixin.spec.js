if (typeof require === 'function') {
  const buster    = require("buster")
      , Helpers   = require('../buster-helpers')
      , Sequelize = require('../../index')
      , dialects  = Helpers.getSupportedDialects()
}

buster.spec.expose()

dialects.forEach(function(dialect) {
  describe('Mixin@' + dialect, function() {
    before(function(done) {
      Helpers.initTests({
        dialect: dialect,
        beforeComplete: function(sequelize) {
          this.sequelize = sequelize
        }.bind(this),
        onComplete: done
      })
    })

    describe('getAssociation', function() {
      it('returns the respective part of the association for 1:1 associations', function() {
        var User = this.sequelize.define('User', {})
        var Task = this.sequelize.define('Task', {})

        User.hasOne(Task)
        Task.belongsTo(User)

        expect(User.getAssociation(Task).target).toEqual(Task)
      })
    })
  })
})
