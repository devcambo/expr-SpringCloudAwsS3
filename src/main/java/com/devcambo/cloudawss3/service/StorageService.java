package com.devcambo.cloudawss3.service;

import io.awspring.cloud.s3.S3Resource;
import io.awspring.cloud.s3.S3Template;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class StorageService {

    private static final String BUCKET_NAME = "my-bucket"; // init in localstack folder
    private final S3Template s3Template;

    public void save(@NonNull final MultipartFile file) {
        final var key = generateUniqueFileName(Objects.requireNonNull(file.getOriginalFilename()));
        try {
            S3Resource upload = s3Template.upload(BUCKET_NAME, key, file.getInputStream());
            log.info("File located at: {}", upload.getLocation());
            log.info("File uri: {}", upload.getURI());
        } catch (IOException e) {
            log.error("Error saving file", e);
            throw new RuntimeException(e);
        }
    }

    public S3Resource retrieve(@NonNull final String objectKey) {
        return s3Template.download(BUCKET_NAME, objectKey);
    }

    public void delete(@NonNull final String objectKey) {
        s3Template.deleteObject(BUCKET_NAME, objectKey);
    }

    public URL generateViewablePresignedUrl(@NonNull final String objectKey) {
        return s3Template.createSignedGetURL(BUCKET_NAME, objectKey, Duration.of(1, ChronoUnit.MINUTES));
    }

    private String generateUniqueFileName(String originalImageName) {
        return String.format(
                "%s%s",
                UUID.randomUUID().toString(),
                originalImageName.substring(originalImageName.lastIndexOf("."))
        );
    }

}
