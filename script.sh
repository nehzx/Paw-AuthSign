#! /bin/bash

npm run build
rm -rf ~/Library/Containers/com.luckymarmot.Paw/Data/Library/Application\ Support/com.luckymarmot.Paw/Extensions/
mv -f build/* ~/Library/Containers/com.luckymarmot.Paw/Data/Library/Application\ Support/com.luckymarmot.Paw/Extensions/
