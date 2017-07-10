angular.module('org.ekstep.lessonbrowserapp', [])
.controller('lessonController', ['$scope', 'instance', 'callback',function($scope, instance, callback) {
    var ctrl = this;

    // QUICK FIX - Return selected lesson from repo. Service should be implemented
    $scope.selectedLessons = {};

    ctrl.lessonbrowser = instance;

    $scope.telemetry = {"pluginid":ctrl.lessonbrowser.manifest.id, "pluginver":ctrl.lessonbrowser.manifest.ver};

    ctrl.generateTelemetry = function(data) {
        if (data) ecEditor.getService('telemetry').interact({
            "type": data.type,
            "subtype": data.subtype,
            "target": data.target,
            "targetid":data.targetid,
            "pluginid": $scope.telemetry.pluginid,
            "pluginver": $scope.telemetry.pluginver,
            // "objectid": ecEditor.getCurrentObject().id,
            // "stage": ecEditor.getCurrentStage().id
        })
    };


    // Delay init of tabs till DOM is loaded
    $scope.$on('ngDialog.opened', function(){
        setTimeout(function(){$('.tabular.menu .item').tab()}, 200);
    });

    // Get and return the selected lessons
    $scope.returnSelectedLessons = function(selectedLessons){
        ctrl.generateTelemetry({type: 'click', subtype: 'submit', target: 'addlesson',targetid: ''});

    	// return selected lessons to the lesson browser caller
    	var err = null;
        var res = selectedLessons;
    	callback(err, res);

    	// close popup
    	$scope.closePopup();
    };

    // Close the popup
    $scope.closePopup = function() {
        ctrl.generateTelemetry({type: 'click', subtype: 'cancel', target: 'addlesson', targetid: ''});
        $scope.closeThisDialog();
    };

    $scope.browserApi = {
    	filters: function(repoId) {
    		var repo = ecEditor._.find(instance.repos, ['id', repoId]);
    		var filters = {};

    		if (repo) {
    			filters = repo.getFilters();
    		}
    		return filters;
    	}
    };
}]);