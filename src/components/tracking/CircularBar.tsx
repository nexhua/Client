import React, {type ReactElement} from 'react';
import {Svg, G, Circle} from 'react-native-svg';
import {View, Animated} from 'react-native';
import {clamp, range} from '../../util/Interpolate';
import Icon from 'react-native-paper/src/components/Icon';
import {type TrackingButtonProps} from './TrackingButton';

export interface CircularBarProps {
  radius: number;
  strokeWidth: number;
  color: string;
  strokeOpacity: number;
  minValue: number;
  maxValue: number;
  currentValue: number;
  animationDuration: number;
  delay: number;
  hasIcon: boolean;
  iconName: string;
  iconSize: number;
  leftChild?: ReactElement<TrackingButtonProps>;
  style?: any;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function CircularBar(props: CircularBarProps): JSX.Element {
  const circleRef = React.useRef<typeof AnimatedCircle>();
  const circumference = Math.floor(2 * Math.PI * props.radius);
  const animatedValue = React.useRef(new Animated.Value(circumference)).current;
  const size = 2 * (props.radius + props.strokeWidth);

  const animation = (toValue: number): void => {
    Animated.timing(animatedValue, {
      toValue,
      duration: props.animationDuration,
      delay: props.delay,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    const strokeDashOffset = calculateStrokeDashOffset(
      props.minValue,
      props.maxValue,
      0,
      360,
      circumference,
      props.currentValue,
    );
    animation(strokeDashOffset);

    animatedValue.addListener(value => {
      if (circleRef?.current !== undefined) {
        (circleRef.current as unknown as View).setNativeProps({
          strokeDashoffset: value.value + 1,
        });
      }
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  }, [props.minValue, props.maxValue, props.currentValue]);

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignContent: 'center',
        ...props.style,
      }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={props.color}
            strokeWidth={props.strokeWidth}
            r={props.radius}
            strokeOpacity={props.strokeOpacity}
            fill="transparent"
          />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            stroke={props.color}
            strokeWidth={props.strokeWidth}
            r={props.radius}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      {props.hasIcon && props.iconName !== '' && (
        <View
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: 'auto',
            marginBottom: 'auto',
          }}>
          <Icon
            size={clamp(props.iconSize, 0, props.radius)}
            source={props.iconName}
            color={props.color}
          />
        </View>
      )}
    </View>
  );
}

function calculateStrokeDashOffset(
  minValue: number,
  maxValue: number,
  rangeStart: number,
  rangeEnd: number,
  circumference: number,
  value: number,
): number {
  const calorieIntakeInterpolation = Math.floor(
    range(
      minValue,
      maxValue,
      rangeStart,
      rangeEnd,
      clamp(value, minValue, maxValue),
    ),
  );

  return Math.floor(
    circumference -
      Math.floor(
        range(
          rangeStart,
          rangeEnd,
          0,
          circumference,
          calorieIntakeInterpolation,
        ),
      ),
  );
}

export default CircularBar;
