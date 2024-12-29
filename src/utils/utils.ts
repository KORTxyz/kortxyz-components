import maplibregl from 'maplibre-gl';


var popup = new maplibregl.Popup({
  closeButton: true,
  closeOnClick: false,
  maxWidth: '100%'
});

function displayValue(value, propName) {
  if (propName === '@timestamp') {
    return value.toString() + "<br>[ " + (new Date(value * 1000)).toISOString() + " ]";
  }
  if (typeof value === 'undefined' || value === null) return value;
  if (typeof value === 'object' ||
    typeof value === 'number' ||
    typeof value === 'string') return value.toString();
  return value;
}

function renderProperty(propertyName, property) {
  return '<div class="mbview_property">' +
    '<div class="mbview_property-name">' + propertyName + '</div>' +
    '<div class="mbview_property-value">' + displayValue(property, propertyName) + '</div>' +
    '</div>';
}

function renderLayer(layerId) {
  return '<div class="mbview_layer">' + layerId + '</div>';
}

function renderProperties(feature) {
  var sourceProperty = renderLayer(feature.layer['source-layer'] || feature.layer.source);
  var idProperty = renderProperty('$id', feature.id);
  var typeProperty = renderProperty('$type', feature.geometry.type);
  var styleidProperty = renderProperty('$layername', feature.layer.id);

  var properties = Object.keys(feature.properties).map(function (propertyName) {
    return renderProperty(propertyName, feature.properties[propertyName]);
  });
  return (feature.id ? [sourceProperty, idProperty, typeProperty, styleidProperty]
    : [sourceProperty, typeProperty]).concat(properties).join('');
}

function getUniqueFeatures(features) {
  const uniqueIds = new Set();
  const uniqueFeatures = [];
  for (const feature of features) {
    const id = feature.id + feature.sourceLayer;
    if (!uniqueIds.has(id)) {
      uniqueIds.add(id);
      uniqueFeatures.push(feature);
    }
  }

  return uniqueFeatures;
}

function renderFeatures(features) {
  const uniqueFeatures = getUniqueFeatures(features);

  return uniqueFeatures.map(function (ft) {
    return '<div class="mbview_feature">' + renderProperties(ft) + '</div>';
  }).join('');
}

function renderPopup(features) {
  return '<div class="mbview_popup">' + renderFeatures(features) + '</div>';
}


export function initHoverPopup(map: maplibregl.Map) {

  map.on('mousemove', (e) => {
    // set a bbox around the pointer
    var selectThreshold = 1;

    const queryBox: [maplibregl.PointLike, maplibregl.PointLike] = [
      [
        e.point.x - selectThreshold,
        e.point.y + selectThreshold
      ], // bottom left (SW)
      [
        e.point.x + selectThreshold,
        e.point.y - selectThreshold
      ] // top right (NE)
    ];

    var features = map.queryRenderedFeatures(queryBox) || [];
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

    if (!features.length) {
      popup.remove();
    } else {
      popup.setLngLat(e.lngLat)
        .setHTML(renderPopup(features))
        .addTo(map);

    }

  });

};

export function initHoverPopupLayer(map: maplibregl.Map, layer, popupcontent, popupcall) {

  map.on('mouseenter', layer, async () => {
    map.getCanvas().style.cursor = 'pointer';
  })

  map.on('click', layer, async (e) => {
    if (popupcall) {
      const popupcallurl = popupcall.replace(/{(\w+)}/g, (_, k) => e.features[0].properties[k])
      const res = await fetch(popupcallurl)
      const json = await res.json()
      e.features[0].properties = { ...e.features[0].properties, ...json }
    }
    const popupHtml = popupcontent.length > 0 ? popupcontent.replace(/{(\w+)}/g, (_, k) => e.features[0].properties[k]) : renderPopup(e.features);

    popup.setLngLat(e.lngLat)
      .setHTML(popupHtml)
      .addTo(map);
  });

  map.on('mouseleave', layer, () => {
    map.getCanvas().style.cursor = '';
  });

}
