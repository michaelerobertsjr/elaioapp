export default function Icon () {
  return {
    restrict: 'E',
    template: '<i class="{{icon.class}}"></i>',
    scope: {
      name: '@',
      additionalClass: '@'
    },
    controllerAs: 'icon',
    bindToController: true,
    controller: function () {
      this.name = this.name || 'search'
      this.additionalClass = this.additionalClass || ''
      this.class = 'fa fa-' + this.name + ' ' + this.additionalClass
    }
  }
}
