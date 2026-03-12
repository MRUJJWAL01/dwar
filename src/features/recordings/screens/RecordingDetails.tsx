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

type Props = NativeStackScreenProps<HomeStackParamList, 'RecordingDetails'>;

type RecordingStatus = 'Completed' | 'Rejected' | 'Pending';
type TimeFilter = 'Last 7 days' | '15 days' | '30 days';

type RecordingItem = {
  id: string;
  title: string;
  status: RecordingStatus;
  orderId: string;
  dateTime: string;
  companyName: string;
  otp: string;
  fileSize: string;
  quality: string;
  cloudBackup: string;
  displayDate: string;
  thumbnail: any;
};

const STATUS_OPTIONS: Array<RecordingStatus | 'All Status'> = [
  'All Status',
  'Completed',
  'Rejected',
  'Pending',
];

const TIME_OPTIONS: TimeFilter[] = ['Last 7 days', '15 days', '30 days'];

export default function RecordingDetails({ navigation, route }: Props) {
  const { width } = useWindowDimensions();
  const isCompact = width < 360;

  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] =
    useState<RecordingStatus | 'All Status'>('All Status');
  const [selectedTime, setSelectedTime] = useState<TimeFilter>('Last 7 days');

  const [statusOpen, setStatusOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  const recordings = useMemo<RecordingItem[]>(
    () => [
      {
        id: '1',
        title: '#AMZ-3312-Amazon',
        status: 'Completed',
        orderId: '#AMZ-3312-Amazon',
        dateTime: 'Nov 29.2025: 3.30 pm',
        companyName: 'delivery',
        otp: '0987',
        fileSize: '145 MB',
        quality: '1080p HD',
        cloudBackup: 'Yes',
        displayDate: 'Dec 1, 2025 at 2:34 PM',
        thumbnail: require('../../../assets/images/recording-thumb-1.png'),
      },
      {
        id: '2',
        title: '#AMZ-3312-Amazon',
        status: 'Rejected',
        orderId: '#AMZ-3312-Amazon',
        dateTime: 'Nov 29.2025: 3.30 pm',
        companyName: 'delivery',
        otp: '1122',
        fileSize: '122 MB',
        quality: '1080p HD',
        cloudBackup: 'Yes',
        displayDate: 'Dec 1, 2025 at 2:34 PM',
        thumbnail: require('../../../assets/images/recording-thumb-1.png'),
      },
      {
        id: '3',
        title: '#AMZ-3312-Amazon',
        status: 'Pending',
        orderId: '#AMZ-3312-Amazon',
        dateTime: 'Nov 29.2025: 3.30 pm',
        companyName: 'delivery',
        otp: '3344',
        fileSize: '98 MB',
        quality: '720p HD',
        cloudBackup: 'No',
        displayDate: 'Dec 1, 2025 at 2:34 PM',
        thumbnail: require('../../../assets/images/recording-thumb-1.png'),
      },
    ],
    [],
  );

  const totalRecordings = '8';
  const storageUsed = '0.9 GB';
  const thisMonth = '1';

  const currentRecording =
    recordings.find(item => item.id === route.params.recordingId) ??
    recordings[0];

  const onDownload = () => {
    // later
  };

  const onShare = () => {
    // later
  };

  return (
    <SafeAreaView style={styles.safe}>
      <BlueHeader
        title="Back to Recording"
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

        {/* Filters */}
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

        {/* Recording detail card */}
        <View style={styles.detailCard}>
          <View style={styles.playerWrap}>
            <Image
              source={currentRecording.thumbnail}
              style={styles.playerImage}
              resizeMode="cover"
            />

            <Pressable style={styles.playBtn}>
              <Image
                source={require('../../../assets/icons/recordings/play.png')}
                style={styles.playIcon}
                resizeMode="contain"
              />
            </Pressable>

            <View style={styles.progressWrap}>
              <Text style={styles.progressTime}>0:00</Text>
              <View style={styles.progressBar}>
                <View style={styles.progressFilled} />
              </View>
              <Text style={styles.progressTime}>2:45</Text>
            </View>
          </View>

          <View style={styles.titleRow}>
            <Text style={styles.detailTitle}>{currentRecording.title}</Text>

            <View style={styles.topActionRow}>
              <Pressable style={styles.iconSquareBtn} onPress={onDownload}>
                <Image
                  source={require('../../../assets/icons/recordings/download-2.png')}
                  style={styles.squareActionIcon}
                  resizeMode="contain"
                />
              </Pressable>

              <Pressable style={styles.iconSquareBtn} onPress={onShare}>
                <Image
                  source={require('../../../assets/icons/recordings/share.png')}
                  style={styles.squareActionIcon}
                  resizeMode="contain"
                />
              </Pressable>
            </View>
          </View>

          <View style={styles.dateRow}>
            <Image
              source={require('../../../assets/icons/recordings/clock.png')}
              style={styles.clockIcon}
              resizeMode="contain"
            />
            <Text style={styles.dateText}>{currentRecording.displayDate}</Text>
          </View>

          <Text style={styles.sectionHeading}>Delivery Information</Text>

          <View style={styles.metaList}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Order ID</Text>
              <Text style={styles.metaValue}>{currentRecording.orderId}</Text>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Date & Time</Text>
              <Text style={styles.metaValue}>{currentRecording.dateTime}</Text>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Company name</Text>
              <Text style={styles.metaValue}>{currentRecording.companyName}</Text>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>OTP</Text>
              <Text style={styles.metaValue}>{currentRecording.otp}</Text>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Status</Text>
              <Text
                style={[
                  styles.metaValue,
                  currentRecording.status === 'Completed' && styles.statusCompleted,
                  currentRecording.status === 'Rejected' && styles.statusRejected,
                  currentRecording.status === 'Pending' && styles.statusPending,
                ]}
              >
                {currentRecording.status}
              </Text>
            </View>
          </View>

          <Text style={[styles.sectionHeading, { marginTop: 18 }]}>
            Recording Details
          </Text>

          <View style={styles.metaList}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>File Size:</Text>
              <Text style={styles.metaValue}>{currentRecording.fileSize}</Text>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Quality:</Text>
              <Text style={styles.metaValue}>{currentRecording.quality}</Text>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Cloud Backup:</Text>
              <Text
                style={[
                  styles.metaValue,
                  currentRecording.cloudBackup === 'Yes' && styles.statusCompleted,
                ]}
              >
                {currentRecording.cloudBackup}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footerInfoBox}>
          <Text style={styles.footerInfoText}>
            Recordings are automatically deleted after 90 days • Cloud backup enabled
          </Text>
        </View>

        <View style={{ height: 14 }} />
      </ScrollView>

      <DropdownModal
        visible={statusOpen}
        options={STATUS_OPTIONS}
        selectedValue={selectedStatus}
        onClose={() => setStatusOpen(false)}
        onSelect={value => {
          setSelectedStatus(value as RecordingStatus | 'All Status');
          setStatusOpen(false);
        }}
      />

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

  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 14,
  },

  playerWrap: {
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
  },

  playerImage: {
    width: '100%',
    height: 240,
    borderRadius: 14,
  },

  playBtn: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    marginLeft: -28,
    marginTop: -28,
    width: 56,
    height: 56,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  playIcon: {
    width: 26,
    height: 26,
  },

  progressWrap: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  progressTime: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  progressBar: {
    flex: 1,
    height: 3,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },

  progressFilled: {
    width: '42%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#2362EB',
  },

  titleRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'center',
  },

  detailTitle: {
    flex: 1,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '900',
    color: '#111827',
  },

  topActionRow: {
    flexDirection: 'row',
    gap: 10,
  },

  iconSquareBtn: {
    width: 52,
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  squareActionIcon: {
    width: 22,
    height: 22,
  },

  dateRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  clockIcon: {
    width: 20,
    height: 20,
  },

  dateText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
  },

  sectionHeading: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '900',
    color: '#111827',
  },

  metaList: {
    marginTop: 14,
    gap: 12,
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

  statusCompleted: {
    color: '#16A34A',
  },

  statusRejected: {
    color: '#DC2626',
  },

  statusPending: {
    color: '#D97706',
  },

  footerInfoBox: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },

  footerInfoText: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    color: '#6B7280',
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