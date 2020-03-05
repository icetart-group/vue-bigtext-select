Vue.component("v-bigselect", {
	template: 	`<div class="v-bs_">
					<span style="display:none">{{temp_changed}}</span>
					<div class="v-bs_select">
						<div contenteditable="true" autocomplete="false" class="v-bs_input" v-text="temp" @input="onInputEdit" @keydown.enter="endEdit" @keydown.down="downEdit" @keydown.up="upEdit" @click="clear"></div>
						<i class="fa fa-angle-left v-bs_fa"></i>
					</div>
					<div class="v-bs_dlist">
						<ul class="v-bs_list" v-show="onSearch">
							<li :class="'v-bs_item ' + list.active" v-for="(list, index) in list_filter" :key="index" @mouseover="hoverItem(list[id])" @click="selectItem(list)">{{list[text]}}</li>
							<li class="v-bs_item v-bs_notfound" v-if="list_filter.length < 1">No se encontraron resultados.</li>  
						</ul>
					</div>
				</div>`,
	props: ['options','text','id','value'],
	data() {
		return {
			temp: "",
			search: "",
			onSearch: false,
			hovered: "",
			selected: {}
		};
	},
	methods: {
		clear() {
			if (!this.onSearch) {
				this.temp = "";
				this.search = "";
				this.temp = "";
				this.$emit("input", 0);
				this.onSearch = true;
			}
		},
		onInputEdit(evt) {
			var src = evt.target.innerHTML;
			this.search = src;
		},
		endEdit(evt) {
			if (this.hovered != "") {
				this.list_filter.forEach((el, index) => {
					if (this.hovered == this.list_filter[index][this.id]) {
						this.selectItem(this.list_filter[index]);
					}
				});
			}
			evt.preventDefault();
		},
		getBlur(evt) {
			this.onSearch = !this.onSearch;
		},
		selectItem(item) {
			this.getBlur();
			this.temp = item[this.text];
			this.$emit("input", item[this.id]);
			this.$emit("change");
		},
		hoverItem(id) {
			this.hovered = id;
		},
		downEdit() {
			if (this.hovered == "" && this.list_filter.length > 0) {
				this.hovered = this.list_filter[0][this.id];
			} else if (this.list_filter.length > 0) {
				var indexId = -1;
				this.list_filter.forEach((el, index) => {
					if (this.hovered == this.list_filter[index][this.id]) {
						indexId = index;
					}
				});
				if (this.list_filter.length > indexId + 1) {
					this.hovered = this.list_filter[indexId + 1][this.id];
				}
			}
		},
		upEdit() {
			if (this.hovered != "" && this.list_filter.length > 0) {
				var indexId = -1;
				this.list_filter.forEach((el, index) => {
					if (this.hovered == this.list_filter[index][this.id]) indexId = index;
				});
				if (0 < indexId) {
					this.hovered = this.list_filter[indexId - 1][this.id];
				}
			}
		}
	},
	computed: {
		list_filter: function() {
			var _this = this;
			function filterItems(options, arg) {
				return options.filter(function(el) {
					return el[_this.text].toUpperCase().includes(arg);
				});
			}
			var filtered = filterItems(this.options, this.search.toUpperCase());
			filtered.forEach(el => {
				el.active = "";
				if (el[_this.id] == _this.hovered) {
					el.active = "v-bs_itemactive";
				}
			});
			return filtered;
		},
        temp_changed: function() {
            var _this = this;
            _this.options.forEach( el => {
                if(_this.value == el[_this.id]){
                    _this.temp = el[this.text];
                }
            })
            return _this.temp;
        }
	}
});