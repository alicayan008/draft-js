/**
 * Copyright (c) Facebook, Inc. and its affiliates. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @format
 * @flow strict-local
 * @emails oncall+draft_js
 */

'use strict';

const UserAgent = require('UserAgent');

const isOSX = UserAgent.isPlatform('Mac OS X');

const KeyBindingUtil = {
  /**
   * Check whether the ctrlKey modifier is *not* being used in conjunction with
   * the altKey modifier. If they are combined, the result is an `altGraph`
   * key modifier, which should not be handled by this set of key bindings.
   */
  isCtrlKeyCommand: function(e: SyntheticKeyboardEvent<>): boolean {
    return !!e.ctrlKey && !e.altKey;
  },

  isOptionKeyCommand: function(e: SyntheticKeyboardEvent<>): boolean {
    return isOSX && e.altKey;
  },

  usesMacOSHeuristics: function(): boolean {
    return isOSX;
  },

  hasCommandModifier: function(e: SyntheticKeyboardEvent<>): boolean {
    return isOSX
      ? !!e.metaKey && !e.altKey
      : KeyBindingUtil.isCtrlKeyCommand(e);
  },
};

module.exports = KeyBindingUtil;
