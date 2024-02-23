import React from 'react';
import {Dimensions, I18nManager, StyleSheet, TouchableOpacity, View} from 'react-native';
import {PaginationProps} from 'react-native-swiper-flatlist';
import {colors, vertical, horizontal} from 'react-native-swiper-flatlist/src/themes';
import {Button, HStack, Text} from "@gluestack-ui/themed-native-base";


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    marginVertical: vertical.xxSmall,
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: horizontal.small,
  },
  pagination: {
    width: horizontal.small,
    height: horizontal.small,
    borderRadius: 25,
    marginHorizontal: horizontal.xSmall,
  },
  paginationText: {
    color: colors.white,
    height: horizontal.small,
  },
});

/**
 * Slide navigation component FROM react-native-swiper-flatlist forked for custom add Skip & Next buttons
 * https://github.com/gusgard/react-native-swiper-flatlist/blob/master/src/components/Pagination/Pagination.tsx
 **/
export interface SlidePaginationProps extends PaginationProps {

}

export const SlidePagination: React.FC<SlidePaginationProps> = ({
                                                                  size,
                                                                  paginationIndex = 0,
                                                                  scrollToIndex,
                                                                  paginationDefaultColor = colors.gray,
                                                                  paginationActiveColor = colors.white,
                                                                  paginationStyle = {},
                                                                  paginationStyleItem = {},
                                                                  paginationStyleItemActive = {},
                                                                  paginationStyleItemInactive = {},
                                                                  onPaginationSelectedIndex,
                                                                  paginationTapDisabled = false,
                                                                  e2eID = '',
                                                                }) => {
  return (
    <View style={[styles.container, paginationStyle]}>
      <Button
        style={[
          styles.paginationText,
          paginationStyleItem,
          {backgroundColor: "blue"},
          paginationStyleItemInactive,
        ]}
        onPress={() => {
          onPaginationSelectedIndex?.();
        }}
        disabled={paginationTapDisabled}
      >
          Merhaba
      </Button>
        {Array.from({length: size}).map((_, index) => (
          <TouchableOpacity
            testID={`${e2eID}_pagination_${index}`}
            style={[
              styles.pagination,
              paginationStyleItem,
              paginationIndex === index
                ? {backgroundColor: paginationActiveColor}
                : {backgroundColor: paginationDefaultColor},
              paginationIndex === index ? paginationStyleItemActive : paginationStyleItemInactive,
            ]}
            key={index}
            onPress={() => {
              scrollToIndex({index});
              onPaginationSelectedIndex?.();
            }}
            disabled={paginationTapDisabled}
          />
        ))}
    </View>
  );
};