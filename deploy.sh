#!/bin/bash
ssh dokku@tannguyen.org apps:create simple-chat-faye
tar -cv src package.json start.js -C .dokku CHECKS nginx.conf.sigil | ssh dokku@tannguyen.org tar:in simple-chat-faye
