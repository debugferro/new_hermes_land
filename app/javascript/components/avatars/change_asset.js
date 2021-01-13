import { resolveIdPattern } from './initialize/skincolor/initialize_assets_for_color';
import initializeColorIndexes from './initialize/color/initialize_index';
import { grabElements } from './initialize/grab_elements';
import updateCanvas from './update_canvas';
// import takeBtnFromDom from './initialize/take_btn_from_dom';

const iterateBackOrForward = (array, index, direction) => {
    if(index > array.length - 1) {
      index = 0;
    }

    if (direction == 1){
      if(index == array.length - 1) {
        index = 0;
      }
      else
      {
        index = index + 1;
      }
      return {
        direction: index
      }
    } else {
      if(index == 0 || index < 0) {
        index = array.length - 1;
      } else {
        index = index - 1;
      }
      return {
        direction: index
      }
    }
  }

// ----------------------------------------------------------------------------

// export function changeAsset(basicAssets, avDom, movingDirection, assetIndex, allAssetsColors = null, assetColorOpt = null ) {
//   // iterating over existing assets options
//   assetIndex.changeIndex(iterateBackOrForward(basicAssets, assetIndex.index, movingDirection).direction);
//   let currentAsset = basicAssets[assetIndex.index];
//   // loading existing colors options for the new asset
//   if (allAssetsColors) {
//     let initializedValues = initializeColorIndexes(currentAsset, allAssetsColors);
//     assetColorOpt.changeColors(initializedValues.colors)
//     assetColorOpt.changeIndex(initializedValues.index)
//   }
//   // sending changes to canvas:
//   console.log(currentAsset)
//   avDom.src = `/avatar/${currentAsset}`
//   avDom.addEventListener("load", function () {
//     updateCanvas(grabElements());
//   });
// };

export function changeAsset(basicAssets, avDom, movingDirection, assetIndex, layer, layers) {
  console.log(`asset index was ${assetIndex.index}`)
  console.log(`current asset was ${basicAssets[assetIndex.index]}`)
  assetIndex.changeIndex(iterateBackOrForward(basicAssets, assetIndex.index, movingDirection).direction);
  console.log(`asset index is now ${assetIndex.index}`)
  let currentAsset = basicAssets[assetIndex.index];
  console.log(`current asset is now ${currentAsset}`)
  avDom.src = `/avatar/${currentAsset}`
  avDom.addEventListener("load", function () {
    console.log(`layer was: ${layer._assets[0].src}`)
    layer.assets = [avDom];
  });
}

// ----------------------------------------------------------------------------

export function changeColor(assetColorOpt, avDom) {
  // iterating over existing color options
  assetColorOpt.changeIndex(iterateBackOrForward(assetColorOpt.colors, assetColorOpt.index, 1).direction);
  let currentColor = assetColorOpt.colors[assetColorOpt.index];
  // sending changes to canvas:
  if (currentColor && currentColor.length > 0) {
    avDom.src = `/avatar/${currentColor}`
    avDom.addEventListener("load", function () {
      updateCanvas(grabElements());
    });
  }
}

export function changeSkinColor(assetColorOpt, avDom, filteredAssets, assets, btnTo) {
  assetColorOpt.changeIndex(iterateBackOrForward(assetColorOpt.colors, assetColorOpt.index, 1).direction);
  let currentColor = assetColorOpt.colors[assetColorOpt.index];
  // resolving idPattern based on the current new color
  const idPattern = resolveIdPattern(currentColor);
  // redefining available assets based on the new skin color
  filteredAssets.redefineAssets(assets, idPattern);
  // TODO: change mouth, nose and eyes for its correspondent in the new skin color
  btnTo.change.mouth.forward.click();
  btnTo.change.nose.forward.click();
  btnTo.change.eyes.forward.click();
  // sending changes to canvas:
  avDom.src = `/avatar/${currentColor}`
    avDom.addEventListener("load", function () {
    updateCanvas(grabElements());
  });
}
