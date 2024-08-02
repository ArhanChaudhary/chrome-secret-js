#!/usr/bin/env python

import sys
import json
import struct
import sqlite3


def main():
    conn = sqlite3.connect("secrets.db")
    cur = conn.cursor()
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS secrets(
            documentId TEXT,
            secretId TEXT,
            secret TEXT,
            PRIMARY KEY (documentId, secretId)
        )
        """
    )
    conn.commit()

    while True:
        message = readMessage()
        handleMessage(cur, message)
        conn.commit()


def handleMessage(cur, message):
    if message["type"] == "set":
        cur.execute(
            "REPLACE INTO secrets VALUES (?, ?, ?)",
            (message["documentId"], message["secretId"], message["secret"]),
        )
    elif message["type"] == "get":
        cur.execute(
            "SELECT secret FROM secrets WHERE documentId = ? AND secretId = ?",
            (message["documentId"], message["secretId"]),
        )
        row = cur.fetchone()
        if row is None:
            secret = None
        else:
            secret = row[0]
        writeMessage({"requestId": message["requestId"], "secret": secret})


def readMessage():
    messageLength = struct.unpack("@I", sys.stdin.buffer.read(4))[0]
    message = sys.stdin.buffer.read(messageLength).decode("utf-8")
    return json.loads(message)


def writeMessage(message):
    encoded = json.dumps(message).encode("utf-8")
    encodedLength = struct.pack("@I", len(encoded))
    sys.stdout.buffer.write(encodedLength)
    sys.stdout.buffer.write(encoded)
    sys.stdout.buffer.flush()


main()
