/**
 * @constructor
 */
function HotkeysController(windowController, tabs, editor, settings) {
  this.windowController_ = windowController;
  this.tabs_ = tabs;
  this.editor_ = editor;
  this.settings_ = settings;

  this.KEY = {};
  // create key map A - Z
  for (var i = 65; i <= 90; i++) {
    this.KEY[String.fromCharCode(i).toUpperCase()] = i;
  }

  this.KEY.TAB = 9;
  this.KEY.SPACE = 32;
  this.KEY.EQUALS = 187;
  this.KEY.MINUS = 189;

  $(document).keydown(this.onKeydown_.bind(this));
};

/**
 * Some hotkeys are handled by CodeMirror directly. Among them:
 * Ctrl-C, Ctrl-V, Ctrl-X, Ctrl-Z, Ctrl-Y, Ctrl-A
 */
HotkeysController.prototype.onKeydown_ = function(e) {
  if (e.ctrlKey || e.metaKey) {
    switch (e.keyCode) {
      case this.KEY.TAB:  // Tab
        if (e.shiftKey) {
          this.tabs_.previousTab();
        } else {
          this.tabs_.nextTab();
        }
        return false;

      case this.KEY.F:
        $('#search-button').click();
        return false;

      case this.KEY.N:
        if (e.shiftKey) {
          this.tabs_.newWindow();
        } else {
          this.tabs_.newTab();
        }
        return false;

      case this.KEY.O:
        this.tabs_.openFiles();
        return false;

      case this.KEY.S:
        if (e.shiftKey) {
          this.tabs_.saveAs();
        } else {
          this.tabs_.save();
        }
        return false;

      case this.KEY.W:
        if (e.shiftKey) {
          this.windowController_.close();
        } else {
          this.tabs_.closeCurrent();
        }
        return false;

      case this.KEY.Z:
        if (e.shiftKey) {
          this.editor_.redo();
          return false;
        }
        break;

      case this.KEY.EQUALS:
        var fontSize = this.settings_.get('fontsize');
        this.settings_.set('fontsize', fontSize * (9/8));
        return false;

      case this.KEY.MINUS:
        var fontSize = this.settings_.get('fontsize');
        this.settings_.set('fontsize', fontSize * (8/9));
        return false;
    }
  } else if (e.altKey) {
    if (e.keyCode === this.KEY.SPACE) {
      $('#toggle-sidebar').click();
      return false;
    }
  }
};
