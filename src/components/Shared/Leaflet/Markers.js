import { forwardRef } from 'react';
import { CircleMarker, Marker, Popup, Tooltip } from 'react-leaflet';
import { MAP } from 'const';
import L from 'leaflet';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const { GEO_LOCATION } = MAP;

// eslint-disable-next-line no-underscore-dangle
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: iconShadow,
});

export const LeafletMarker = function LeafletMarker({ position = [], tooltip, ...other }) {
  return (
    <Marker position={position} {...other}>
      {tooltip && <Tooltip>{tooltip}</Tooltip>}
    </Marker>
  );
};

export const LeafletCircleMarker = forwardRef(
  (
    {
      markerProps = { center: GEO_LOCATION.SL_CENTER, radius: 12, stroke: false, fillOpacity: 0.4 },
      popup,
      ...other
    },
    ref,
  ) => (
    <CircleMarker {...markerProps} {...other}>
      <Popup ref={ref}>{popup}</Popup>
    </CircleMarker>
  ),
);
