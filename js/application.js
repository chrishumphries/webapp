var NotesApp = (function(){
	var App = {
		stores: {},
		views: {}
		
	} 
	
	App.stores.notes =  new Store('notes');
	
	// Note Model
	var Note = Backbone.Model.extend({
		localStorage: App.stores.notes,
		
		initialize: function(){
			if(!this.get('title')){
				this.set({title: "Note @" + Date()})
			};
			
			if(!this.get('body')){
				this.set({body: "No Content"})
			};

			
		}
		
	})
	
	//Collections
	
	var NoteList = Backbone. Collection.extend({
		model: Note,
		localStorage: App.stores.notes,
		
		
		initialize: function(){
			var collection = this;
			this.localStorage.bind('update', function(){
				collection.fetch();
			})
		}
		
	})
	
	//Views
	
	var NewFormView = Backbone.View.extend({
		
		
		
		events: {
			"submit form": "createNote"
			
		},
		
		createNote: function(e){
		
			var attrs = this.getAttributes()
			note = new Note();
			
			note.set(attrs);
			note.save();
			
			e.preventDefault();
			e.stopPropagation();
			
			$('.ui-dialog').dialog('close');
			this.reset();
				
			
		},
		
		getAttributes: function(){
			return {
				title: this.$('form [name=title]').val(),
				body: this.$('form [name=body]').val()
			}
		},
		
		reset:function(){
			this.$('input, textarea').val('');
		}
		
	});
	
	window.Note = Note;
	
	$(document).ready(function(){
	App.views.new_form = new NewFormView({
		el: $('#new')
	});
	})
	
	
	
	
	return App;
})()