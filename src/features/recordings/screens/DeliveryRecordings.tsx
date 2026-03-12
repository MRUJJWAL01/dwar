import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Image,
  Modal,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { HomeStackParamList } from '../../../navigation/tabs/stacks/HomeStack';
import BlueHeader from '../../../components/layout/BlueHeader';

type Props = NativeStackScreenProps<HomeStackParamList, 'DeliveryRecordings'>;

type RecordingStatus = 'Completed' | 'Rejected' | 'Pending';
type TimeFilter = 'Last 7 days' | '15 days' | '30 days';

type RecordingItem = {
  id: string;
  title: string;
  status: RecordingStatus;
  orderId: string;
  dateTime: string;
  companyName: string;
  thumbnail: any;
  duration: string;
};

const STATUS_OPTIONS: RecordingStatus[] = ['Completed', 'Rejected', 'Pending'];
const TIME_OPTIONS: TimeFilter[] = ['Last 7 days', '15 days', '30 days'];

export default function DeliveryRecordings({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const isCompact = width < 360;

  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<
    RecordingStatus | 'All Status'
  >('All Status');
  const [selectedTime, setSelectedTime] = useState<TimeFilter>('Last 7 days');

  const [statusOpen, setStatusOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  const recordings = useMemo<RecordingItem[]>(
    () => [
      {
        id: '1',
        title: 'Mobile Phone Case',
        status: 'Completed',
        orderId: '#AMZ-3312-Amazon',
        dateTime: 'Nov 29.2025: 3.30 pm',
        companyName: 'delivery',
        thumbnail: require('../../../assets/images/recording-thumb-1.png'),
        // thumbnail: require('../../../assets/images/recording-thumb-1.png'),
        duration: '1:12',
      },
      {
        id: '2',
        title: 'Rejected Package',
        status: 'Rejected',
        orderId: '#AMZ-3312-Amazon',
        dateTime: 'Nov 29.2025: 3.30 pm',
        companyName: 'delivery',
        thumbnail: require('../../../assets/images/recording-thumb-1.png'),
        duration: '1:12',
      },
      {
        id: '3',
        title: 'Fashion Accessories',
        status: 'Pending',
        orderId: '#AMZ-3312-Amazon',
        dateTime: 'Nov 29.2025: 3.30 pm',
        companyName: 'Delivery',
        thumbnail: require('../../../assets/images/recording-thumb-1.png'),
        duration: '1:12',
      },
    ],
    [],
  );

  const filteredRecordings = useMemo(() => {
    return recordings.filter(item => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.trim().toLowerCase()) ||
        item.orderId.toLowerCase().includes(search.trim().toLowerCase()) ||
        item.companyName.toLowerCase().includes(search.trim().toLowerCase());

      const matchesStatus =
        selectedStatus === 'All Status' || item.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [recordings, search, selectedStatus]);

  const totalRecordings = recordings.length;
  const storageUsed = '0.9 GB';
  const thisMonth = '1';

  const onView = (id: string) => {
    navigation.navigate('RecordingDetails', { recordingId: id });
  };

  const onDownload = (id: string) => {
    // later: download/share
  };

  return (
    <SafeAreaView style={styles.safe}>
      <BlueHeader
        title="Delivery Recordings"
        subtitle="Complete video audit trail"
        onBackPress={() => navigation.goBack()}
        large
      />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          isCompact && styles.contentCompact,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary cards */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{totalRecordings}</Text>
            <Text style={styles.summaryTitle}>Total Recordings</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{storageUsed}</Text>
            <Text style={styles.summaryTitle}>Storage Used</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{thisMonth}</Text>
            <Text style={styles.summaryTitle}>This month</Text>
          </View>
        </View>

        {/* Filters row */}
        <View style={styles.filtersRow}>
          <View style={styles.searchBox}>
            <Image
              source={require('../../../assets/icons/recordings/search.png')}
              style={styles.searchIcon}
              resizeMode="contain"
            />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="search by"
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
            />
          </View>

          <Pressable
            style={styles.dropdownBtn}
            onPress={() => setStatusOpen(true)}
          >
            <Text style={styles.dropdownBtnText}>{selectedStatus}</Text>
            <Image
              source={require('../../../assets/icons/recordings/chevron-down.png')}
              style={styles.dropdownIcon}
              resizeMode="contain"
            />
          </Pressable>

          <Pressable
            style={styles.iconDropdownBtn}
            onPress={() => setTimeOpen(true)}
          >
            <Image
              source={require('../../../assets/icons/recordings/calendar.png')}
              style={styles.iconDropdownImage}
              resizeMode="contain"
            />
          </Pressable>
        </View>

        {/* Cards */}
        <View style={styles.cardsWrap}>
          {filteredRecordings.map(item => (
            <View key={item.id} style={styles.recordCard}>
              <View style={styles.cardHeader}>
                <View style={styles.thumbWrap}>
                  <Image
                    source={item.thumbnail}
                    style={styles.thumbnail}
                    resizeMode="cover"
                  />
                  <Text style={styles.durationText}>{item.duration}</Text>
                </View>

                <View style={styles.cardHeaderInfo}>
                  <Text style={styles.recordTitle}>{item.title}</Text>

                  <View
                    style={[
                      styles.statusBadge,
                      item.status === 'Completed' &&
                        styles.statusBadgeCompleted,
                      item.status === 'Rejected' && styles.statusBadgeRejected,
                      item.status === 'Pending' && styles.statusBadgePending,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusBadgeText,
                        item.status === 'Completed' &&
                          styles.statusTextCompleted,
                        item.status === 'Rejected' && styles.statusTextRejected,
                        item.status === 'Pending' && styles.statusTextPending,
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.metaList}>
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>Order ID</Text>
                  <Text style={styles.metaValue}>{item.orderId}</Text>
                </View>

                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>Date & Time</Text>
                  <Text style={styles.metaValue}>{item.dateTime}</Text>
                </View>

                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>Company name</Text>
                  <Text style={styles.metaValue}>{item.companyName}</Text>
                </View>
              </View>

              <View style={styles.actionRow}>
                <Pressable
                  style={[styles.actionBtn, styles.viewBtn]}
                  onPress={() => onView(item.id)}
                >
                  <Image
                    source={require('../../../assets/icons/recordings/eye.png')}
                    style={styles.actionIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.viewBtnText}>View</Text>
                </Pressable>

                <Pressable
                  style={[styles.actionBtn, styles.downloadBtn]}
                  onPress={() => onDownload(item.id)}
                >
                  <Image
                    source={require('../../../assets/icons/recordings/download.png')}
                    style={styles.actionIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.downloadBtnText}>Download</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 14 }} />
      </ScrollView>

      {/* Status dropdown */}
      <DropdownModal
        visible={statusOpen}
        options={['All Status', ...STATUS_OPTIONS]}
        selectedValue={selectedStatus}
        onClose={() => setStatusOpen(false)}
        onSelect={value => {
          setSelectedStatus(value as RecordingStatus | 'All Status');
          setStatusOpen(false);
        }}
      />

      {/* Time dropdown */}
      <DropdownModal
        visible={timeOpen}
        options={TIME_OPTIONS}
        selectedValue={selectedTime}
        onClose={() => setTimeOpen(false)}
        onSelect={value => {
          setSelectedTime(value as TimeFilter);
          setTimeOpen(false);
        }}
      />
    </SafeAreaView>
  );
}

type DropdownModalProps = {
  visible: boolean;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onClose: () => void;
};

function DropdownModal({
  visible,
  options,
  selectedValue,
  onSelect,
  onClose,
}: DropdownModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.dropdownSheet}>
              {options.map(option => {
                const isSelected = option === selectedValue;
                return (
                  <Pressable
                    key={option}
                    style={[
                      styles.dropdownItem,
                      isSelected && styles.dropdownItemSelected,
                    ]}
                    onPress={() => onSelect(option)}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        isSelected && styles.dropdownItemTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  content: {
    padding: 16,
    gap: 14,
  },

  contentCompact: {
    padding: 12,
  },

  summaryRow: {
    flexDirection: 'row',
    gap: 10,
  },

  summaryCard: {
    flex: 1,
    minHeight: 96,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 14,
    justifyContent: 'center',
  },

  summaryValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111827',
  },

  summaryTitle: {
    marginTop: 8,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '700',
    color: '#6B7280',
  },

  filtersRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  searchBox: {
    flex: 1.2,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    color: '#111827',
    fontSize: 15,
    fontWeight: '500',
  },

  dropdownBtn: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dropdownBtnText: {
    color: '#6B7280',
    fontSize: 15,
    fontWeight: '500',
  },

  dropdownIcon: {
    width: 16,
    height: 16,
  },

  iconDropdownBtn: {
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconDropdownImage: {
    width: 20,
    height: 20,
  },

  cardsWrap: {
    gap: 14,
  },

  recordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 14,
  },

  cardHeader: {
    flexDirection: 'row',
    gap: 12,
  },

  thumbWrap: {
    width: 84,
    height: 84,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },

  thumbnail: {
    width: '100%',
    height: '100%',
  },

  durationText: {
    position: 'absolute',
    right: 6,
    bottom: 4,
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },

  cardHeaderInfo: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  recordTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '900',
    color: '#111827',
  },

  statusBadge: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
  },

  statusBadgeCompleted: {
    backgroundColor: '#ECFDF3',
    borderColor: '#BBF7D0',
  },

  statusBadgeRejected: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },

  statusBadgePending: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },

  statusBadgeText: {
    fontSize: 12,
    fontWeight: '800',
  },

  statusTextCompleted: {
    color: '#16A34A',
  },

  statusTextRejected: {
    color: '#DC2626',
  },

  statusTextPending: {
    color: '#D97706',
  },

  metaList: {
    marginTop: 16,
    gap: 10,
  },

  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },

  metaLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },

  metaValue: {
    flex: 1,
    textAlign: 'right',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: '#111827',
  },

  actionRow: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 12,
  },

  actionBtn: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },

  viewBtn: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D1D5DB',
  },

  downloadBtn: {
    backgroundColor: '#FFFFFF',
    borderColor: '#93C5FD',
  },

  actionIcon: {
    width: 18,
    height: 18,
  },

  viewBtnText: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '700',
  },

  downloadBtnText: {
    color: '#2362EB',
    fontSize: 15,
    fontWeight: '700',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.12)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  dropdownSheet: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  dropdownItem: {
    minHeight: 52,
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },

  dropdownItemSelected: {
    backgroundColor: '#F3F4F6',
  },

  dropdownItemText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
  },

  dropdownItemTextSelected: {
    fontWeight: '700',
  },
});
