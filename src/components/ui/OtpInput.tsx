import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Text, Platform } from 'react-native';

type Props = {
  length?: number; // default 4
  value?: string;  // controlled optional
  onChange?: (code: string) => void;
  autoFocus?: boolean;
  errorText?: string;
};

export default function OtpInput({
  length = 4,
  value,
  onChange,
  autoFocus = true,
  errorText,
}: Props) {
  const inputsRef = useRef<Array<TextInput | null>>([]);
  const [internal, setInternal] = useState<string>('');

  const code = value ?? internal;

  const digits = useMemo(() => {
    const arr = Array.from({ length }, (_, i) => code[i] ?? '');
    return arr;
  }, [code, length]);

  const setCode = (next: string) => {
    const clean = next.replace(/\D/g, '').slice(0, length);
    if (value === undefined) setInternal(clean);
    onChange?.(clean);
  };

  useEffect(() => {
    if (!autoFocus) return;
    const t = setTimeout(() => {
      inputsRef.current[0]?.focus();
    }, 250);
    return () => clearTimeout(t);
  }, [autoFocus]);

  const focusIndex = (i: number) => {
    const idx = Math.max(0, Math.min(length - 1, i));
    inputsRef.current[idx]?.focus();
  };

  const handleChangeAt = (i: number, text: string) => {
    // paste / fast input support
    const clean = text.replace(/\D/g, '');
    if (clean.length > 1) {
      const merged = (code.slice(0, i) + clean + code.slice(i + clean.length)).slice(0, length);
      setCode(merged);
      const nextIndex = Math.min(length - 1, i + clean.length);
      focusIndex(nextIndex);
      return;
    }

    const nextChar = clean ? clean[0] : '';
    const next = code.split('');
    next[i] = nextChar;
    const merged = next.join('').slice(0, length);
    setCode(merged);

    if (nextChar && i < length - 1) focusIndex(i + 1);
  };

  const handleKeyPressAt = (i: number, key: string) => {
    if (key !== 'Backspace') return;

    if (digits[i]) {
      // clear current
      const next = code.split('');
      next[i] = '';
      setCode(next.join(''));
      return;
    }
    // move back and clear previous
    if (i > 0) {
      const next = code.split('');
      next[i - 1] = '';
      setCode(next.join(''));
      focusIndex(i - 1);
    }
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        {digits.map((d, i) => (
          <TextInput
            key={i}
            ref={(r) => (inputsRef.current[i] = r)}
            value={d}
            onChangeText={(t) => handleChangeAt(i, t)}
            onKeyPress={({ nativeEvent }) => handleKeyPressAt(i, nativeEvent.key)}
            style={[styles.box, d ? styles.boxFilled : null]}
            keyboardType={Platform.select({ ios: 'number-pad', android: 'numeric' })}
            returnKeyType="done"
            textAlign="center"
            maxLength={1}
            importantForAutofill="no"
            autoCorrect={false}
            autoCapitalize="none"
            selectionColor="#2563EB"
          />
        ))}
      </View>

      {!!errorText && <Text style={styles.error}>{errorText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%', alignItems: 'center' },
  row: { flexDirection: 'row', gap: 16, justifyContent: 'center' },

  box: {
    width: 52,
    height: 52,
    borderRadius: 6.5,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    fontSize: 30,
    letterSpacing:-2,
    lineHeight:30,
    fontWeight: '500',
    color: '#2362EB',
  },
  boxFilled: {
    borderColor: '#2362EB',
  },

  error: { marginTop: 10, color: '#EA8080', fontSize: 12, fontWeight: '600' },
});